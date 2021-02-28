const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient
// const mongoose = require('mongoose');
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const connectionString = "mongodb+srv://samUser:dbPass123456@cluster0-udemy-course.lifhy.mongodb.net/test?retryWrites=true&w=majority";

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var foundMatchInDb = false;
app.get('/api/foundMatchInDb', (req, res) => {
    res.send({ foundMatch: foundMatchInDb });
})

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('places-geo-task')
        const placesCollection = db.collection('places');

        app.get('/api/get-database', (req,res) => {
            db.collection('places').find().toArray()
                .then(results => {
                    res.send({ places: results });
                })
                .catch(error => console.error(error))
        })

        app.post('/api/add-place', async (req,res) => {
            const newPlace = req.body;
            // Check Address
            var placeMatch = false, lngMatch = false, hasCheckedPlace = false;
            await placesCollection.find({streetAddress: newPlace.streetAddress}).toArray((err, res) => {
                if (err) throw err;
                if (res && res.length > 0) {
                    for(let k of res) {
                        console.log(k)
                        if (k.place === newPlace.place || k.streetAddress === newPlace.streetAddress) {
                            placeMatch = true;
                            break;
                        }
                    }
                }
                hasCheckedPlace = true;
            })
            if (!placeMatch && newPlace.latitude && newPlace.longitude) {
                // Check Lat longs
                var latQuery = { latitude: newPlace.latitude }
                await placesCollection.find(latQuery).toArray((err, res) => {
                    if (err) throw err;
                    if (res && res.length > 0) {
                        for (let k of res) {
                            console.log(k)
                            if (k.longitude === newPlace.longitude) {
                                lngMatch = true;
                                break;
                            }
                        }
                    }
                });
            }

            if (!lngMatch && !placeMatch && hasCheckedPlace) {
                placesCollection.insertOne(req.body).catch(error => console.error(error))
            } else {
                console.log("Match found")
            }
            foundMatchInDb = (placeMatch || lngMatch) && hasCheckedPlace;
            res.redirect('/')
        });

        app.get('/api/search', async (req, res) => {
            switch (req.query.key.toLowerCase()) {
                case 'place':
                    await placesCollection.find({place: req.query.value}).toArray((err, result) => {
                        if (err) throw err;
                        res.send({results: result})
                    })
                    break;
                case 'streetAddress':
                    await placesCollection.find({streetAddress: req.query.value}).toArray((err, result) => {
                        if (err) throw err;
                        res.send(JSON.stringify({results: result}))
                    })
                    break;
                case 'city':
                    await placesCollection.find({city: req.query.value}).toArray((err, result) => {
                        if (err) throw err;
                        res.send(JSON.stringify({results: result}))
                    })
                    break;
                case 'countryOrRegion':
                    await placesCollection.find({countryOrRegion: req.query.value}).toArray((err, result) => {
                        if (err) throw err;
                        res.send(JSON.stringify({results: result}))
                    })
                    break;
                default:
                    break;

            }
        })

        app.listen(process.env.PORT || 8080);
    })
    .catch(console.error);


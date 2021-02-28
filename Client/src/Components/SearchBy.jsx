import React, {useState} from "react";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";

const SearchBy = ({fromChildToParentCallback}) => {
    const [gotSearchResults, setGotSearchResults] = useState(null);

    const handleClick = e => {
        e.preventDefault();
        console.log();
        if(e.target[1].value.length === 0) {
            setGotSearchResults(false);
            return;
        }
        fetch('/api/search?key='+e.target[0].value + "&value="+e.target[1].value, {method: 'GET'})
            .then(res => res.json()).then(
            (result) => {
                const allResults = [];
                result.results.forEach(item => {
                    allResults.push(item);
                });
                setGotSearchResults(true);
                sendResultsToParent(allResults, e.target[1].value);
            },
            // error handler
            (err) => {
                console.log(err)
            },
        );
    }

    const sendResultsToParent = (allResults, searchWord) => {
        return fromChildToParentCallback(allResults, searchWord)
    }
    return (
        <div className="searchByContainer">
            <Form onSubmit={handleClick}>
                <Form.Group>
                    <Form.Control as="select">
                        <option>Place</option>
                        <option>Street Address</option>
                        <option>City</option>
                        <option>Country / Region</option>
                    </Form.Control>
                    <InputGroup size="sm" className="mb-3" place>
                        <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" type="text" placeholder="Search for.."/>
                    </InputGroup>
                </Form.Group>
                <Button type="submit" style={{marginTop: 15, marginBottom: 30, backgroundColor: gotSearchResults === false ? "red" : null}}>Search</Button>
            </Form>
        </div>
    );
};
export default SearchBy;

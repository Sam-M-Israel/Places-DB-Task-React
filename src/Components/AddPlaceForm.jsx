import React from "react";
import {Button} from "react-bootstrap";
import useForm from '../useForm';
import validate from '../validate';

const AddPlaceForm = () => {
    const {inputs, handleInputChange, handleSubmit, errors} = useForm({
        place: '',
        streetAddress: '',
        city: '',
        countryOrRegion: '',
        latitude: null,
        longitude: null,
        plusCode: ''
    }, validate);

    return (
        <div className="addPlaceForm">
            <form onSubmit={handleSubmit}>
                <input
                    style={{borderColor: errors.place ? 'red' : "transparent"}}
                    type="text" placeholder="Place Name"
                    name="place"
                    onChange={handleInputChange}
                    value={inputs.place}/>
                {errors.place ? <p style={{color: "red", fontSize: 15}}>{errors.place}</p> : null}
                <input
                    type="text"
                    placeholder="Street Name / Near"
                    name="streetAddress"
                    onChange={handleInputChange}
                    value={inputs.streetAddress}/>
                <input
                    style={{borderColor: errors.general ? 'red' : "transparent"}}
                    type="text"
                    placeholder="City"
                    name="city"
                    onChange={handleInputChange}
                    value={inputs.city}/>
                <input
                    style={{borderColor: errors.general ? 'red' : "transparent"}}
                    type="text"
                    placeholder="Country/Region"
                    name="countryOrRegion"
                    onChange={handleInputChange}
                    value={inputs.countryOrRegion}/>
                <input
                    style={{borderColor: errors.general || errors.latitude ? 'red' : "transparent"}}
                    type="number" placeholder="Latitude"
                    name="latitude"
                    onChange={handleInputChange}
                    value={inputs.latitude}/>
                {errors.latitude ? <p style={{color: "red", fontSize: 15}}>{errors.latitude}</p> : null}
                <input
                    style={{borderColor: errors.general || errors.longitude ? 'red' : "transparent", width: 'auto'}}
                    type="number"
                    placeholder="Longitude"
                    name="longitude"
                    onChange={handleInputChange}
                    value={inputs.longitude}/>
                {errors.longitude ? <p style={{color: "red", fontSize: 15}}>{errors.longitude}</p> : null}
                {errors.general ? <p style={{color: "red", fontSize: 15}}>{errors.general}</p> : null}
                <Button type="submit">Add Place</Button>
            </form>
        </div>
    );
};
export default AddPlaceForm;

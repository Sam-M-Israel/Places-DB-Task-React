import React from "react";
import {Accordion, Button, Card} from "react-bootstrap";
import SearchBy from "./SearchBy";

const TopBar = (props) => {

    return (
        <div className="topButtonContainer">
            <Button onClick={() => props.onAddPlaceClick('addPlace')} style={{visibility: props.showSideBarButton ? 'visible' : 'hidden' }}>Add Place</Button>
            <Button onClick={props.onGetPlacesClick}>Get Places</Button>
            <Button onClick={() => props.onAddPlaceClick('search')}>Search</Button>
        </div>
    );
};
export default TopBar;

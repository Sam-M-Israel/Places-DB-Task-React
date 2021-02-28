import React from "react";
import {Button} from "react-bootstrap";
import AddPlaceForm from "./AddPlaceForm";
import SearchBy from "./SearchBy";

const SideNavBar = ({width, closeNav, formToOpen, fromChildToParentCallback}) => {
    return (
        <div className="sidenav" style={{width: width}}>
            {formToOpen === 'addPlace' ? <AddPlaceForm />: <SearchBy fromChildToParentCallback={fromChildToParentCallback}/>}
            <Button onClick={closeNav} style={{position: 'absolute', bottom: 0, marginTop: 10, marginBottom: 30}}>Done</Button>
        </div>
    );
};
export default SideNavBar;

import React from "react";
import {Accordion, Card} from "react-bootstrap";

const Results = ({data, title}) => {

    return (
        <div className="placesListContainer">
            <h3 style={{color: "white"}}>{title}</h3>
            <Accordion defaultActiveKey="0" style={{borderRadius: 7}}>
                {data.map((item) => (
                    <Card key={item._id} style={{ minWidth: '18rem'}}>
                        <Accordion.Toggle as={Card.Header} eventKey={item._id}>Place: {item.place}</Accordion.Toggle>
                        <Accordion.Collapse eventKey={item._id}>
                            <Card.Body>
                                <ul className="placeAttr" style={{width: "max-content", textAlign: "left"}}>
                                    {item.streetAddress ? <li>{item.streetAddress}</li> : null}
                                    {item.city ? <li>{item.city}</li> : null}
                                    {item.countryOrRegion ?  <li>{item.countryOrRegion}</li> : null}
                                    {item.latitude ? <li>{item.latitude}</li> : null}
                                    {item.longitude ? <li>{item.longitude}</li> : null}
                                </ul>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                ))}
            </Accordion>
        </div>
    );
};
export default Results;

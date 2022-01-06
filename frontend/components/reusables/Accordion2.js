import Accordion from 'react-bootstrap/Accordion'


import React from 'react';

import {useAccordionButton} from 'react-bootstrap/AccordionButton';
import {Card} from "react-bootstrap";


function CustomToggle({children, eventKey}) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

    return (
        <li
            onClick={decoratedOnClick}>
            {children}
        </li>
    );
}

function Example() {
    return (
        <Accordion defaultActiveKey="0">
            <CustomToggle eventKey="0">Click me!</CustomToggle>
            <Accordion.Collapse eventKey="0">
                <p>Hello! I'm the body</p>
            </Accordion.Collapse>

        </Accordion>
    );
}

export default Example
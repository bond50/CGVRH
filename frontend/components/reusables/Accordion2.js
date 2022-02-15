import Accordion from 'react-bootstrap/Accordion'
import {useAccordionButton} from 'react-bootstrap/AccordionButton';
import classes from "../../styles/accordion2.module.css";
import React from "react";
import useToggle from "../../hooks/useToggle";


function Accordion2({title, children, icon}) {

    const [showChevron, toggleChevron] = useToggle()
    let chevronClass = [classes.ChevronDown, 'bi bi-chevron-down', ' ms-auto']
    if (showChevron) {
        chevronClass.push(classes.Rotate)
    }

    function CustomToggle({children, eventKey}) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            toggleChevron(),
        );

        return (
            <div className={`nav-link ${classes.NavLink}`} onClick={decoratedOnClick}>
                {children}
            </div>
        );
    }

    return (
        <Accordion as='li' className={`${classes.SidebarListItem} nav-item`}>
            <CustomToggle eventKey="0">
                <i className={`bi bi-${icon}`}/><span>{title}</span>
                <i className={chevronClass.join(' ')}/>
            </CustomToggle>

            <Accordion.Collapse eventKey="0" as='ul' className={classes.NavContent}>
                {children}
            </Accordion.Collapse>
        </Accordion>
    );
}

export default Accordion2
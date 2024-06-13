

import Accordion from 'react-bootstrap/Accordion';
import {useAccordionButton} from 'react-bootstrap/AccordionButton';
import classes from "../../styles/accordion2.module.css";
import React from "react";
import {Icon} from "@iconify/react";
import useToggle from "../../hooks/useToggle";

function Accordion2({title, children, icon}) {
    const [showChevron, toggleChevron] = useToggle();

    const chevronClass = `${classes.ChevronDown} ${showChevron ? classes.Rotate : ''}`;

    const checkActiveClass = (child) => {
        if (child.props && child.props.className && child.props.className.includes('active')) {
            // console.log('Active class found in child:', child.props.className);
            return true;
        }
        if (child.props && child.props.children) {
            return React.Children.toArray(child.props.children).some(grandchild => checkActiveClass(grandchild));
        }
        return false;
    };

    const hasActiveChild = React.Children.toArray(children).some(checkActiveClass);


    const accordionClass = hasActiveChild ? classes.active : '';
 

    function CustomToggle({eventKey}) {
        const decoratedOnClick = useAccordionButton(eventKey, () => {
            toggleChevron();
        });

        return (
            <div className={`nav-link ${classes.NavLink} ${accordionClass}`} onClick={decoratedOnClick}>
                <Icon icon={icon} className={classes.icon}/>
                <span>{title}</span>
                <Icon icon="mdi:chevron-down" className={chevronClass}/>
            </div>
        );
    }

    return (
        <Accordion as='li' className={`${classes.SidebarListItem} nav-item ${accordionClass}`}>
            <CustomToggle eventKey="0"/>
            <Accordion.Collapse eventKey="0" as='ul'>
                <>
                    {children}
                </>
            </Accordion.Collapse>
        </Accordion>
    );
}

export default Accordion2;

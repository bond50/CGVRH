import React from 'react';
import classes from "./header.module.css";

export  const CustomDropDown = ({clicked, closed, dropText, children}) => {
    let attachedClasses = [classes.Container];

    if (closed) {
        attachedClasses = [classes.Container, classes.ToggleDrop];
    }


    return (
        < li onClick={clicked} className={classes.MenuItem}>
            <a className={`${classes.Link} ${classes.HasDropdown}`}>
                <span>{dropText}</span>
                <i className={closed ? `bi bi-chevron-up` : `bi bi-chevron-down`}/>
            </a>
            <div className={attachedClasses.join(' ')}>
                <ul className={classes.ContainerList}>
                    {children}
                </ul>
            </div>
        </li>
    );
};

export default CustomDropDown;
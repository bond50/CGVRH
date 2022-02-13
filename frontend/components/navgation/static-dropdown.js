import React from 'react';
import useToggle from "../../hooks/useToggle";

const StaticDropdown = ({caption, children}) => {
    const [closed, toggleClosed] = useToggle();
    return (
        <li className={`dropdown`} onClick={toggleClosed}>
            <a href={'#'}
            >
                <span>{caption} </span> <i
                className="bi bi-chevron-down"/>
            </a>
            <ul className={`${closed ? 'dropdown-active' : null}`}>
                {children}
            </ul>
        </li>
    );
};

export default StaticDropdown;
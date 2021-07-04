import {useState} from "react";
import classes from '../../../../styles/Dropdown.module.css'
const MyDropdown = ({text, children}) => {
    const [active, setActive] = useState(false)
    const toggle = () => {
        setActive(!active);
    };

    return (
        <li
            onClick={toggle}
            className={`${classes.DropdownLi}`}>
            <a>
                <span>{text}</span>
                <i className="bi bi-chevron-down"/>
            </a>

            {/*<ul className={active ? 'dropdown-active' : ""}>*/}
            {/*    {children}*/}
            {/*</ul>*/}
            <ul className={classes.DropdownUl}>
                {children}
            </ul>
        </li>

    );
};

export default MyDropdown;
import {useState} from "react";
const MyDropdown = ({text, children}) => {
    const [active, setActive] = useState(false)
    const toggle = () => {
        setActive(!active);
    };

    return (
        <li
            onClick={toggle}
            className="dropdown">
            <a className='drop-color'>
                <span>{text}</span>
                <i className="bi bi-chevron-down"/>
            </a>
            <ul className={active ? 'dropdown-active' : ""}>
                {children}
            </ul>
        </li>

    );
};

export default MyDropdown;
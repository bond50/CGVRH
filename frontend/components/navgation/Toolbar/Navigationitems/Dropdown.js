import classes from '../../../../styles/Dropdown.module.css'
import {useState} from "react";
import Link from "next/link";


const MyDropdown = ({children, caption,dropLink}) => {
    const [open, setOpen] = useState(false)
    const toggleDropdown = () => {
        setOpen((open) => !open)
    };

    return (
        <li className={classes.Dropdown} onClick={toggleDropdown} >
          <Link href={dropLink}>
                <a ><span>{caption}</span> <i className="bi bi-chevron-down"/></a>
          </Link>
            <ul className={open ? classes.DropdownActive : ''} >
                {children}
            </ul>
        </li>

    );
}

export default MyDropdown;
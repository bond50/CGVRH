import SingleLink from "./singe_link/single-link";
import {useState, useEffect, useRef} from "react";
import MenuItem from "./singe_link/menu-item";


const SingleDropdown = ({children, nested, deepText, activeClassName,reload, href}) => {
    const [open, setOpen] = useState(false)
    const toggleDropdown = () => {
        setOpen((open) => !open)
    };
    // let dropRef = useRef([]);
    //
    // useEffect(() => {
    //     console.log(dropRef.current.focus())
    //     // setOpen(dropRef.current.children[0]);
    // }, []);

    return (
        <MenuItem
            deepText={deepText}
            className={activeClassName}
            nested={nested}
            href={''}
            reload={reload}
            clicked={toggleDropdown}>
            <ul className={`dropdown-menu ${open ? 'dropdown-active' : ''}`}>
                {children}
            </ul>
        </MenuItem>
    );
};

export default SingleDropdown;
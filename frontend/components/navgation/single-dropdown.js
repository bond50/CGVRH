import SingleLink from "./single-link";
import {useState, useEffect, useRef} from "react";


const SingleDropdown = ({children, nested, deepText,activeClassName,href}) => {
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
        <SingleLink
            deepText={deepText}
            className={activeClassName}
            nested={nested}
            clicked={toggleDropdown}>
             <ul className={`dropdown-menu ${open ? 'dropdown-active' : ''}`}>
                {children}
            </ul>
        </SingleLink>
    );
};

export default SingleDropdown;
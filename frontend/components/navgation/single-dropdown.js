import SingleLink from "./single-link";
import {useState, useEffect, useRef} from "react";


const SingleDropdown = ({children, nested, deepText,activeClassName}) => {
    const [open, setOpen] = useState(false)
    const toggleDropdown = () => {
        setOpen((open) => !open)
    };
    let dropRef = useRef([]);

    useEffect(() => {
        console.log(dropRef.current.focus())
        // setOpen(dropRef.current.children[0]);
    }, []);

    return (
        <SingleLink
            deepText={deepText} href='#'
            className={activeClassName}
            nested={nested} clicked={toggleDropdown}>
            <ul className={open ? 'dropdown-active' : ''} ref={dropRef}>
                {children}
            </ul>
        </SingleLink>
    );
};

export default SingleDropdown;
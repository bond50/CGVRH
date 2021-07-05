const MyDropdown = ({className,clicked,children,caption}) => {
    return (
        <li className={className}
            onClick={clicked}><a href={`#`}><span>{caption}</span> <i className="bi bi-chevron-down"/></a>
            {children}
        </li>

    );
};

export default MyDropdown;
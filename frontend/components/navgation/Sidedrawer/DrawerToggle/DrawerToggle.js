import classes from '../../../../styles/DrawerToggle.module.css';

const DrawerToggle = ({clicked, open}) => {
    let toggleClasses
    if (!open) {
        toggleClasses = "bi bi-list"
    } else {
        toggleClasses = `bi bi-x ${classes.bix}`
    }

    return (
        <i className={`${toggleClasses} ${classes.DrawerToggle}`} onClick={clicked}/>
    );
};

export default DrawerToggle;
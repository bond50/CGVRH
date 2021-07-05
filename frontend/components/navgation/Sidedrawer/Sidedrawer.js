import classes from '../../../styles/Sidedrawer.module.css';
import Navbar from "../Navigationitems/Navbar";
import DrawerToggle from "./DrawerToggle/DrawerToggle";


const SideDrawer = ({closeSideDrawer, open}) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <div className={attachedClasses.join(' ')}>
            <Navbar mobile/>

            <DrawerToggle clicked={closeSideDrawer} open={open}/>

        </div>

    );
};

export default SideDrawer;
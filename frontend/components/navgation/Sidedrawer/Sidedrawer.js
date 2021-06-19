import classes from '../../../styles/Sidedrawer.module.css';
import NavigationItems from "../Navigationitems/NavigationItems";
import DrawerToggle from "./DrawerToggle/DrawerToggle";


const SideDrawer = ({closeSideDrawer, open}) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <>
            <div className={attachedClasses.join(' ')} >
                <nav>
                    <NavigationItems />
                </nav>
                 <DrawerToggle clicked={closeSideDrawer} open={open}/>
            </div>
        </>
    );
};

export default SideDrawer;
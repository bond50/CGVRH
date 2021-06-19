import NavigationItem from "./Navigationitems/NavigationItem/NavigationItem";
import {isAuth} from "../../actions/auth";

const Admin = () => {
    return (
        <NavigationItem className='nav-link scrollto' text={`${isAuth().name}'s Dashboard`} href='/admin'/>
    );
};

export default Admin;
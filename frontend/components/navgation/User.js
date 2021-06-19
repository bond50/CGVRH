import NavigationItem from "./Navigationitems/NavigationItem/NavigationItem";
import {isAuth} from "../../actions/auth";

const User  = () => {
    return (
        <NavigationItem className='nav-link scrollto' text={`${isAuth().name}'s Dashboard`} href='/user'/>
    );
};

export default User;
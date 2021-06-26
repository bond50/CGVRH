import Home from "../Home";
import MyDropdown from "./NavigationItem/Dropdown";
import About from "../About";
import Services from "../Services";
import Media from "../Media";
import Tender from "../Tenders";
import Training from "../Training";
import Contact from "../Contact";
import Covid from "../Covid";
import {isAuth, signout} from "../../../actions/auth";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import SignOut from "../Signout";
import Blogs from "../Blogs";


const NavigationItems = () => (
    <nav className='navbar'>
        <ul>
            <Home/>
            <MyDropdown text='About Us'>
                <About/>
            </MyDropdown>
            <MyDropdown text='Services'>
                <Services/>
            </MyDropdown>
            <MyDropdown text='Media'>
                <Media/>
            </MyDropdown>
            <Tender/>
            <Training/>
            <Contact/>
            <MyDropdown text='Covid'>
                <Covid/>
            </MyDropdown>
            <Blogs/>


            {!isAuth() && <>
                <SignIn/>
                <SignUp/>
            </>
            }

            {isAuth() && <SignOut/>}
        </ul>
    </nav>
);

export default NavigationItems;
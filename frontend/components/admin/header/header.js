import classes from './header.module.css'
import Logo from "./logo/logo";
import HeaderNav from "./header-nav/header-nav";

const Header = ({clicked}) => {
    return (
        <div className={`${classes.Header}`}>
            <Logo clicked={clicked}/>
            <HeaderNav/>
        </div>
    );
};

export default Header;
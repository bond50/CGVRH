import {Component,Fragment} from "react";
import Toolbar from "../components/navgation/Toolbar/Toolbar";
import Footer from "../components/footer/Footer";
import SideDrawer from "../components/navgation/Sidedrawer/Sidedrawer";
import Top from "../components/navgation/Topbar/Top";
import Hero from "../components/home/Hero";

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        let {children} = this.props;
        return (
            <>
                <Top/>
                <Toolbar showSideDrawer={this.sideDrawerToggleHandler}/>
                {/*<SideDrawer open={this.state.showSideDrawer} closeSideDrawer={this.sideDrawerToggleHandler}/>*/}
                {/*<Fragment>*/}
                {/*    <Hero/>*/}
                {/*    <main id='main'>*/}
                {/*        {children}*/}
                {/*    </main>*/}
                {/*</Fragment>*/}
                {/*<Footer/>*/}
            </>
        );
    }
}


export default Layout

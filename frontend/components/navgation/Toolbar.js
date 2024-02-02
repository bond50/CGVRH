import {Fragment} from 'react';
import Top from "./top/Top";
import Header from "./header/header"


const Toolbar = ({pages}) => {

    return (
        <Fragment>
            <Top/>
            <Header pages={pages}/>
        </Fragment>
    )

}


export default Toolbar;

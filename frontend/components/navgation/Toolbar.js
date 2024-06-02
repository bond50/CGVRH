import {Fragment} from 'react';
import Top from "./top/Top";
import Header from "./header/header"


const Toolbar = ({pages,blog}) => {

    return (
        <Fragment>
            <Top/>
            <Header
                pages={pages}
                blog={blog}/>
        </Fragment>
    )

}


export default Toolbar;

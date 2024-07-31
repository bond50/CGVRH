import {Fragment} from 'react';
import Top from "./top/Top";
import Header from "./header"


const Toolbar = ({pages, blog}) => {

    return (
        <Fragment>
            <Top blog={blog}/>
            <Header
                pages={pages}
                blog={blog}/>
        </Fragment>
    )

}


export default Toolbar;

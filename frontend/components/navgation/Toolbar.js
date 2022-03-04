import {Fragment} from 'react';
import Top from "./top/Top";
import Header from "./header/header"


const Toolbar = ({blog}) => {

    return (
        <Fragment>
            {blog && <Top/>}
            <Header blog={blog}/>
        </Fragment>
    )

}


export default Toolbar;

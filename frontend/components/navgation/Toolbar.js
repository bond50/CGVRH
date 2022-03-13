import {Fragment} from 'react';
import Top from "./top/Top";
import Header from "./header/header"


const Toolbar = ({blog,home}) => {

    return (
        <Fragment>
            {blog && <Top/>}
            <Header blog={blog} home={home}/>
        </Fragment>
    )

}


export default Toolbar;

import {Fragment, useEffect, useState} from 'react';
import Top from "./top/Top";
import Header from "./header/header"
import useSWR from "swr";
import {API} from "../../config";


const Toolbar = ({blog}) => {

    return (
        <Fragment>
            {!blog && <Top/>}
            <Header blog={blog}/>
        </Fragment>
    )

}


export default Toolbar;

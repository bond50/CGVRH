import {Fragment, useEffect, useState} from 'react';
import Top from "./top/Top";
import Header from "./header/header"
import useSWR from "swr";
import {API} from "../../config";


const Toolbar = () => {


    return (
        <Fragment>
            <Top/>
            <Header />
        </Fragment>
    )

}


export default Toolbar;

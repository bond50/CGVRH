import {Fragment, useEffect, useState} from 'react';
import Top from "./Top";
import Header from "./header"
import classes from "../../styles/Header.module.css";

const Toolba = () => {

    return (
        <Fragment>
            <Top/>
            <Header/>
        </Fragment>
    )

}

export default Toolba;

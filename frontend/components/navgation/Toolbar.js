import {Fragment, useEffect, useState} from 'react';
import Top from "./Top";
import Header from "./header/header"
import useSWR from "swr";
import {API} from "../../config";


const Toolbar = () => {
    const {data: services, error: serviceError} = useSWR(`${API}/list-service-names-slugs`)
    if (serviceError) {
        return <p>Failed to fetch services</p>
    }
    if (!services) {
        return <p>loading</p>
    }


    return (
        <Fragment>
            <Top/>
            <Header services={services}/>
        </Fragment>
    )

}


export default Toolbar;

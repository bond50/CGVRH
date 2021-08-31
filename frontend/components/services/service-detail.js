import classes from '../../styles/service-detail.module.css'
import {API} from "../../config";
import renderHTML from "react-render-html";
import React, {Fragment, useEffect, useState} from "react";

import useSWR from "swr";
import Link from "next/link";

import GeneralPageWrapper from "../../hoc/general-page-wrapper";
import {useRouter} from "next/router";


const ServiceDetail = ({service}) => {

    // const router = useRouter();
    //
    // const {data, error} = useSWR(`${API}/services`)
    //
    //
    // const allServices = () => {
    //     return data && data.map(service => {
    //
    //         const first = service.slug;
    //         data.sort(function (x, y) {
    //             return x === first ? -1 : y === first ? 1 : 0;
    //         });
    //
    //
    //         let assignedClasses = [`nav-link ${classes.navLink} `]
    //         const link = `/services/${service.slug}/`
    //
    //         if (router.asPath === link) {
    //             assignedClasses.push(classes.active)
    //         }
    //
    //         return <Link href={link} key={service._id}>
    //             <a className={assignedClasses.join(' ')}>{service.title}</a>
    //         </Link>
    //
    //     })
    //
    // }

    const showServiceTags = () =>
        service.tags.map((t, i) => (
            <li key={i}>
                <Link href={`/service-tags/${t.slug}`}>
                    <a> {t.name}</a>
                </Link>
            </li>
        ));

    function showCats() {
        return service.categories.map((c, i) => (
            <li key={i}>
                <Link href={`/service-categories/${c.slug}`}>
                    <a>{c.name}</a>
                </Link>
            </li>
        ))
    }


    return (
        <Fragment>
            <GeneralPageWrapper
                title={service.title}
                title2={service.title}
                imgSrc={`${API}/service/photo/${service.slug}`}
                alt={service.title} >
                <div className={`${classes.content} `}>
                    {renderHTML(service.body.trim())}
                    <div className={classes.Footer}>
                        <i className="bi bi-folder"/>
                        <ul className={classes.Cats}>
                            {showCats()}
                        </ul>
                        <i className="bi bi-tags"/>
                        <ul className={classes.Tags}>
                            {showServiceTags()}
                        </ul>
                    </div>
                </div>
            </GeneralPageWrapper>
        </Fragment>

    );
};

export default ServiceDetail;
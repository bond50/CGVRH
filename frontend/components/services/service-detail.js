import classes from '../../styles/service-detail.module.css'
import Link from "next/link";
import Image from "next/image";
import {API} from "../../config";
import renderHTML from "react-render-html";
import React, {Fragment, useEffect, useState} from "react";
import useSWR from "swr";


const ServiceDetail = ({service}) => {

    const {data, error} = useSWR(`${API}/services`)


    const imgSrc = `${API}/service/photo/${service.slug}`

    const myLoader = ({src}) => {
        return imgSrc;
    }


    const allServices = () => {
        let info

        if (!data) {
            info = <h3>loading...!</h3>

        } else {
            info = data.map(service => {
                return <li>
                    <Link href={`/services/${service.slug}`}>
                        <a className={`list-group-item  ${classes.navLink}`}>{service.title}</a>
                    </Link>
                </li>
            })
        }


        return info

    }

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
        <section className={classes.departments}>
            <Fragment>
                <div className="container" data-aos="fade-up" data-aos-once='true'>
                    <div className={classes.sectionTitle} data-aos="fade-up">
                        <h2>Service Detail</h2>
                        <p>{service.title}</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            {error?<h3>failed to load</h3>:<h3>All Services</h3>}
                            <ul className={`list-group list-group-flush flex-column ${classes.navTabs}`}>
                                {allServices()}
                            </ul>
                        </div>
                        <div className="col-lg-9 mt-4 mt-lg-0">
                            <div className={`${classes.details} `}>
                                <Image
                                    loader={myLoader}
                                    src={imgSrc}
                                    alt="" className="img-fluid" width={1200} height={600}/>
                                <h3>{service.title}</h3>
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
                        </div>
                    </div>
                </div>
            </Fragment>
        </section>
    );
};

export default ServiceDetail;
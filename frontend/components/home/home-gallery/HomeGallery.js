import React, {useEffect, useState} from 'react';
import useSWR from "swr";
import {API} from "../../../config";
import {fetcher} from "../../reusables/functions/fetcher";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from "axios";
import Image from "next/image";
import classes from '../../../styles/carded.module.css'
import Link from "next/link";
import Preloader from "../../preloader";

const HomeGallery = (props) => {

    const cards = [
        {
            "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg",
            "title": "Burgundy Flemming",
            "subtitle": "Advertising"
        },
        {
            "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample119.jpg",
            "title": "Nigel Nigel",
            "subtitle": "Sound & Vision"
        },
        {
            "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample120.jpg",
            "title": "Caspian Bellevedere",
            "subtitle": "Accounting"
        },
        {
            "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample121.jpg",
            "title": "Burgundy Flemming",
            "subtitle": "Advertising"
        },
        {
            "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample119.jpg",
            "title": "Nigel Nigel",
            "subtitle": "Sound & Vision"
        },
        {
            "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample120.jpg",
            "title": "Caspian Bellevedere",
            "subtitle": "Accounting"
        },
        {
            "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample121.jpg",
            "title": "Burgundy Flemming",
            "subtitle": "Advertising"
        },
        {
            "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample119.jpg",
            "title": "Nigel Nigel",
            "subtitle": "Sound & Vision"
        },
        {
            "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample120.jpg",
            "title": "Caspian Bellevedere",
            "subtitle": "Accounting"
        },
        {
            "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample121.jpg",
            "title": "Burgundy Flemming",
            "subtitle": "Advertising"
        },


    ];

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 4,

        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 3,


        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2,

        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    };

    const {data, error} = useSWR(
        [
            `${API}/get-gallery-for-home-page`,
        ],
        fetcher,
        {
            revalidateOnFocus: true,
        },
    );
    if (error) return <div>failed to load recent images</div>
    if (!data) return <Preloader/>


    return (
        <section className='gallery-home section-bg'>
            {/*<div className="section-title">*/}
            {/*    <h2>Recently uploaded</h2>*/}
            {/*    <p><Link href='/'>Visit our gallery section for more</Link></p>*/}
            {/*</div>*/}
            <div className="container-fluid">
                <Carousel
                    swipeable={true}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}// means to render carousel on server-side.
                    infinite={true}
                    autoPlay={props.deviceType !== "mobile"}
                    autoPlaySpeed={4000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    deviceType={props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >

                    {data && data.map((image, i) => {
                        return <div key={i} className={`${classes.Container} ${classes.Wrapper} card`}>
                            <Image width={image.width} height={image.height} src={image.filePath} className={`${classes.Img} img-fluid `} alt={image.title}/>
                            <div className={classes.Overlay}>
                                <div className={classes.Text}>
                                    <div>{image.title}</div>
                                </div>
                            </div>

                        </div>
                    })}

                </Carousel>
            </div>
        </section>
    )
        ;
};

export default HomeGallery;
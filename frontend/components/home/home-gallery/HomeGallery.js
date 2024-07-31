import React from 'react';
import useSWR from "swr";
import { API } from "../../../config";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from "next/image";
import Link from "next/link";
import Preloader from "../../preloader";
import { fetcher } from "../../../axios/axios";
import styles from '../../../styles/HomeGallery.module.css'; // Updated CSS import

const HomeGallery = (props) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const { data, error } = useSWR(
        [
            `${API}/get-gallery-for-home-page`,
        ],
        fetcher,
        {
            revalidateOnFocus: true,
        },
    );
    if (error) return <div>failed to load recent images</div>
    if (!data) return <Preloader />

    return (
        <section className={styles.galleryHome}>
            <div className={styles.sectionTitle}>
                <h2>Gallery</h2>
                <p>
                    <Link href='/media/gallery'>Explore our gallery for an in-depth look at our facilities and services</Link>
                </p>
            </div>
            <div className="container-fluid">
                <Carousel
                    swipeable={true}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    ssr={true}
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
                        return (
                            <div key={i} className={`${styles.container} ${styles.wrapper} card`}>
                                <Link href={`/media/gallery`}>
                                    <Image
                                        src={image.filePath}
                                        width={image.width}
                                        height={image.height}
                                        layout="responsive"
                                        className={`${styles.img} card-img-top`}
                                        alt={image.title}
                                    />
                                </Link>
                                <div className={styles.overlay}>
                                    <div className={styles.text}>
                                        <div>{image.title}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Carousel>
            </div>
        </section>
    );
};

export default HomeGallery;

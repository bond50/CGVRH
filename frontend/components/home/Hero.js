import React, {useEffect, useState} from 'react';
import {Carousel} from "react-bootstrap";
import Image from "../reusables/lazy/Image";
import renderHTML from "html-react-parser";
import Link from "next/link";

import {trim} from "../reusables/functions/trim";
import {listFeatured} from "../../actions/projects";


function Hero() {
    const [index, setIndex] = useState(0);
    const [data, setData] = useState([])
    const [nextIcon] = useState(<span className="carousel-control-next-icon bi bi-chevron-right"
                                      aria-hidden="true"/>);
    const [prevIcon] = useState(<span className="carousel-control-next-icon bi bi-chevron-left"
                                      aria-hidden="true"/>);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };


    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await listFeatured();
                setData(response);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchFeatured(); // Call the fetchProjects function when the component mounts
    }, []);


    const renderCarouselItem = () => {
        return data && data.map(d => {

            const isSmallScreen = window.innerWidth <= 768;
            console.log(isSmallScreen)
            let excerptText = trim(d.excerpt, isSmallScreen ? 100 : 200);

            let photoLink;
            if (d.images && d.images.length > 0) {
                if (d.images.length > 1) {
                    const randomIndex = Math.floor(Math.random() * d.images.length);
                    photoLink = d.images[randomIndex].url;
                } else {
                    photoLink = d.images[0].url;
                }
            } else {
                photoLink = "/herp.jpg";
            }

            // Generate the link based on the dataFrom field
            let link = `/services/${d.slug}`;
            if (d.dataFrom === 'pages') {
                link = `/services/${d.slug}`;
            } else if (d.dataFrom === 'projects') {
                link = `/media/projects/${d.slug}`;
            } else if (d.dataFrom === 'blogs') {
                link = `/blogs/${d.slug}`;
            }

            return (
                <Carousel.Item key={d._id} className='carousel-item'>
                    <Image
                        src={photoLink}
                        layout="fill"
                        alt={d.title}
                        className='img-fluid'
                        objectFit="cover"
                    />
                    <div className="carousel-container ">
                        <div className="container">
                            <h2 className="animate__animated animate__fadeInDown">
                                <Link href={link}>
                                    <a><span>{d.title.toLowerCase()}</span></a>
                                </Link>
                            </h2>
                            <div className=" animate__animated animate__fadeInUp">
                                {renderHTML(excerptText)}
                            </div>

                        </div>
                    </div>
                </Carousel.Item>
            );
        });
    }


    return (
        <section id="hero">
            <Carousel
                activeIndex={index} onSelect={handleSelect} fade
                nextLabel='next'
                prevLabel='prev'
                nextIcon={data && data.length && data.length > 1 && nextIcon}
                prevIcon={data && data.length && data.length > 1 && prevIcon}>
                {renderCarouselItem()}
            </Carousel>
        </section>
    );
}

export default Hero;

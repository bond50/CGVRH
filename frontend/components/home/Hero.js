import React, {useEffect, useState} from 'react';
import {Carousel} from "react-bootstrap";
import Image from "next/image";
import renderHTML from "html-react-parser";
import Link from "next/link";

function Hero({services: data, blog}) {

    const [index, setIndex] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextIcon = <span className="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"/>;
    const prevIcon = <span className="carousel-control-next-icon bi bi-chevron-left" aria-hidden="true"/>;

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    function trim(text, length) {
        if (text.length <= length) return text;
        let trimmedText = text.substring(0, length);
        trimmedText = trimmedText.substring(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" ")));
        return trimmedText + "...";
    }

    const renderCarouselItem = () => {
        return data && data.map((d, idx) => {
            let excerptText = trim(d.excerpt, isSmallScreen ? 180 : 200);

            let photoLink;
            if (d.images && d.images.length > 0) {
                photoLink = d.images[0].url;
            } else {
                photoLink = "/herp.jpg";
            }

            let link = `/blogs/${d.slug}`;
            if (d.dataFrom === 'projects') {
                link = `/media/projects/${d.slug}`;
            } else if (d.dataFrom === 'blogs') {
                link = `/blogs/${d.slug}`;
            } else if (d.dataFrom === 'services') {
                link = `/services/${d.slug}`
            }

            return (
                <Carousel.Item key={d._id} className='carousel-item'>
                    <Image
                        src={photoLink}
                        layout="fill"
                        alt={d.title}
                        className='img-fluid'
                        objectFit="cover"
                        priority={idx === 0} // Preload the first image
                    />
                    <div className="carousel-container">
                        <div className="container">
                            <h2 className="animate__animated animate__fadeInDown">
                                <Link href={link}>
                                    <a><span>{d.title.toLowerCase()}</span></a>
                                </Link>
                            </h2>
                            <div className="animate__animated animate__fadeInUp">
                                {renderHTML(trim(excerptText, 102))}
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            );
        });
    };

    const renderIndicators = () => {
        return data && data.map((_, idx) => (
            <li
                key={idx}
                className={idx === index ? 'active' : ''}
                onClick={() => setIndex(idx)}
            />
        ));
    };

    return (
        <section id="hero" className={blog ? 'blog-hero' : ''}>
            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                fade
                nextLabel='next'
                prevLabel='prev'
                nextIcon={data && data.length > 1 && nextIcon}
                prevIcon={data && data.length > 1 && prevIcon}
                indicators={false}
            >
                {renderCarouselItem()}
            </Carousel>
            <ol className="carousel-indicators custom-carousel-indicators">
                {renderIndicators()}
            </ol>
        </section>
    );
}

export default Hero;





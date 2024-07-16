import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import renderHTML from "html-react-parser";
import Link from "next/link";

const defaultImageUrl = '/home/image.jpg';

function Hero({ services: data, blog }) {
    const [index, setIndex] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const isMounted = useRef(true);

    const handleResize = useCallback(() => {
        if (isMounted.current) {
            setIsSmallScreen(window.innerWidth <= 768);
        }
    }, []);

    useEffect(() => {
        isMounted.current = true;
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            isMounted.current = false;
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    const handleSelect = (selectedIndex) => {
        if (isMounted.current) {
            setIndex(selectedIndex);
        }
    };

    const trim = (text, length) => {
        if (!text) return '';
        if (text.length <= length) return text;
        let trimmedText = text.substring(0, length);
        return `${trimmedText.substring(0, trimmedText.lastIndexOf(" "))}...`;
    };

    const renderCarouselItem = () => {
        if (!data || data.length === 0) return <p>No data available</p>;

        return data.map((d, idx) => {
            const excerptText = trim(d.excerpt, isSmallScreen ? 180 : 200);
            const photoLink = d.images && d.images.length > 0 ? d.images[0].url : defaultImageUrl;
            let link = `/blog/${d.slug}`;
            if (d.dataFrom === 'projects') link = `/media/projects/${d.slug}`;
            else if (d.dataFrom === 'services') link = `/services/${d.slug}`;

            return (
                <Carousel.Item key={d._id} className='carousel-item'>
                    <Image
                        src={photoLink}
                        layout="fill"
                        alt={d.title || 'carousel image'}
                        className='img-fluid'
                        objectFit="cover"
                        priority={idx === 0}
                        placeholder="blur"
                        blurDataURL={defaultImageUrl}
                    />
                    <div className="carousel-container">
                        <div className="container">
                            <h2 className="animate__animated animate__fadeInDown">
                                <Link href={link}>
                                    <a><span>{d.title}</span></a>
                                </Link>
                            </h2>
                            <div className="animate__animated animate__fadeInUp">
                                {renderHTML(excerptText)}
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            );
        });
    };

    const renderIndicators = () => {
        if (!data || data.length === 0) return null;

        return data.map((_, idx) => (
            <li
                key={idx}
                className={idx === index ? 'active' : ''}
                onClick={() => handleSelect(idx)}
                aria-label={`Slide ${idx + 1}`}
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
                nextIcon={data && data.length > 1 ? <span className="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"/> : null}
                prevIcon={data && data.length > 1 ? <span className="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"/> : null}
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

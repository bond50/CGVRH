import React, {useState} from 'react';
import {Carousel} from "react-bootstrap";
import Image from "next/image";
import {API} from "../../config";
import renderHTML from "react-render-html";
import Link from "next/link";


function BlogCarousel({blogs}) {
    const [index, setIndex] = useState(0);
    const [nextIcon] = useState(<span className="carousel-control-next-icon bi bi-chevron-right"
                                      aria-hidden="true"/>);
    const [prevIcon] = useState(<span className="carousel-control-next-icon bi bi-chevron-left"
                                      aria-hidden="true"/>);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const renderCarouselItem = () => {
        return blogs && blogs.map(d => {
            let s = d.excerpt
            renderHTML(s)
            console.log(renderHTML(s))
            const myLoader = () => {
                return photoLink;
            }

            let photoLink = `${API}/blog/photo/${d.slug}`

            if (d.images && d.images.length && d.images.length > 0) {
                const image = d.images[Math.floor(Math.random() * d.images.length)];
                photoLink = image.url
            }


            return <Carousel.Item key={d._id} className='carousel-item'>
                <Image
                    loader={myLoader}
                    src={photoLink}
                    layout="fill"
                    objectFit="cover"
                />
                <div className="carousel-container ">
                    <div className="container">
                        <div className="carousel-content animate__animated animate__fadeInUp">
                            <h2 className="animate__animated animate__fadeInDown">{d.title.toLowerCase()}</h2>

                            {renderHTML(d.excerpt.length >= 150? `${d.excerpt.substring(0, 150)}...` : d.excerpt)}

                            <Link href={`/blogs/${d.slug}`}>
                                <a className="btn-get-started">Read
                                    More
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </Carousel.Item>
        })

    }

    return (
        <Carousel
            activeIndex={index} onSelect={handleSelect} fade
            nextLabel=''
            prevLabel=''
            nextIcon={blogs.length && blogs.length > 1 && nextIcon}
            prevIcon={blogs.length && blogs.length > 1 && prevIcon}>
            {renderCarouselItem()}
        </Carousel>
    );
}

export default BlogCarousel
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import classes from './ServiceCard.module.css'

const ServiceCard = ({delay, children, imgSrc,  imgAlt, href, title}) => {

    return (
        <div className={`col-lg-4 col-md-6 ${classes.Service}`} data-aos="fade-up" data-aos-delay={delay}>
            <div className={`card ${classes.Card}`}>
                <div className={classes.CardImg}>
                    <Image
                        src={imgSrc}
                        alt={imgAlt}
                        className="img-fluid"
                        height={427}
                        width={640}/>

                </div>
                <h3>
                    <Link href={href}>
                        <a className="stretched-link">{title}</a>
                    </Link>
                </h3>
                {children}
            </div>
        </div>
    );
};

export default ServiceCard;
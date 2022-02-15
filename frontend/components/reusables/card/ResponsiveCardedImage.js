import React from 'react';
import Image from "next/image";
import classes from './responsive-carded-image.module.css'

const ResponsiveCardedImage = ({imgSrc, width, height, alt, header2, header3, children}) => {


    return (
        <div className={`card ${classes.Card} `}>
            <Image
                src={imgSrc}
                width={width}
                height={height}
                layout="responsive"
                className="card-img-top"
                alt={alt}/>
            <div
                className={`card-body ${classes.CardBody}  d-flex flex-column align-items-center`}>
                {header2 && <h2>{header2}</h2>}
                {header3 && <h3>{header3}</h3>}

                <div className={`mt-2`}>
                    {children}
                </div>

            </div>
        </div>
    );
};

export default ResponsiveCardedImage;
import React from "react";
import {CldImage} from 'next-cloudinary';
import {APP_NAME} from "../../config";

function Hero() {


    return (
        <section id="home-hero">
            <CldImage
                layout='fill'
                src="project/DJI_0153_dkmqkt"
                sizes="100vw"
                alt="Description of my image"
            />

            <div className="container animate__animated animate__backInUp">
                <div className="hero-header">
                    <h2>{APP_NAME}</h2>
                    <p>A facility of choice providing high quality health services to all</p>
                </div>
            </div>

        </section>
    );
}

export default Hero;

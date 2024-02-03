import React from "react";
import {Transformation, Video} from "cloudinary-react";
import {APP_NAME, CLOUDINARY_NAME} from "../../config";

function Hero() {


    return (
        <section id="home-hero">
            <Video
                className="cloudinary-video"
                publicId="vcrh5_d4f09z"
                cloudName={CLOUDINARY_NAME}
                autoPlay
                loop
                muted
                quality="auto"
                fetchFormat="auto"
                resourceType="video"
                crop="fill"
            >
                <Transformation videoCodec="auto" bitrate="auto"/>
            </Video>

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

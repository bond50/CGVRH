import Link from "next/link";
import Image from '../../components/reusables/lazy/Image'
import React from "react";
import {APP_NAME} from "../../config";

function Hero() {
    return (
        <section id="home-hero" className="d-flex align-items-center">
            <div className="container text-center position-relative" data-aos="fade-in" data-aos-delay="200">
                <h1> {APP_NAME}</h1>
                <h2>We take care of your precious health</h2>
                <Link href={"#homepage-about"}>
                    <a className="btn-get-started ">Get Started</a>
                </Link>

            </div>
            <Image
                src="/herp.jpg"
                layout="fill"
                loading="eager"
                alt='photo of vcrh building'
                objectFit="cover"
            />
        </section>

    );
}

export default Hero
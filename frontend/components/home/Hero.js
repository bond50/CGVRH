import Link from "next/link";
import Image from "next/image";
import React from "react";

function Hero() {
    return (
        <section id="home-hero" className="d-flex align-items-center">
            <div className="container text-center position-relative" data-aos="fade-in" data-aos-delay="200">
                <h1> vihiga county referral hospital</h1>
                <h2>We take care of your precious health</h2>
                <Link href={"#about"}>
                    <a className="btn-get-started ">Get Started</a>
                </Link>

            </div>
            <Image
                src="/herp3.jpg"
                layout="fill"
                loading="eager"
                alt='Hero'
                objectFit="cover"
            />

        </section>

    );
}

export default Hero
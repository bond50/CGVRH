import Link from "next/link";
import {API} from "../../config";
import ServiceCard from "../reusables/card/serviceCard/ServiceCard";

import React from "react";
import {generateExcerpt} from "../reusables/functions/generate-excerpt";


const FeaturedServices = ({services}) => {


    return (

        <section className='featured-services'>
            <div className="container" data-aos="slide-up">
                <div className="section-title">
                    <h2>
                        <Link href={`/services`}>
                            Our Services
                        </Link>

                    </h2>
                    <h3>Explore the <span><Link href={`/services`}>Features of Our Services</Link></span></h3>

                    <p>Explore the distinctive attributes that distinguish the services offered at Vihiga County Referral Hospital.</p>


                </div>

                <div className="row gy-3">
                    {services && services.map((service, i) => {

                        let imgSrc = `${API}/general/photo/${service.slug}`
                        if (service.images && service.images.length && service.images.length > 0) {
                            const image = service.images[Math.floor(Math.random() * service.images.length)];
                            imgSrc = image.url
                        }


                        return <ServiceCard
                            title={service.title}
                            delay={`${i * 100}`}
                            href={`/services/${service.slug}`}
                            imgSrc={imgSrc}
                            imgAlt={service.title}
                            key={service._id}
                        >
                            <p>{generateExcerpt(service.excerpt,100)}</p>
                        </ServiceCard>

                    })}
                </div>
            </div>

            {/*<WaveBottom/>*/}

        </section>


    );
};

export default FeaturedServices;
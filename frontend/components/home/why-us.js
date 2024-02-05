import React from 'react';
import {Icon} from "@iconify/react";
import Link from "next/link";

const VihigaHospitalInfo = () => {
    const servicesData = [
        {
            icon: 'material-symbols-light:medical-services-outline-rounded',
            title: 'Comprehensive Medical Services',
            description: 'Providing a wide range of medical services for the community.',
            delay: 200
        },
        {
            icon: 'fluent-emoji-high-contrast:health-worker',
            title: 'Skilled Healthcare Professionals',
            description: 'Our dedicated team of professionals ensures quality healthcare.',
            delay: 300
        },
        {
            icon: 'openmoji:ct-scan',
            title: 'State-of-the-Art Facilities',
            description: 'Equipped with modern facilities to enhance patient care and experience.',
            delay: 400
        },
    ];

    return (
        <section id="hospital-info" className="hospital-info" >
            {/*<Wave/>*/}
            <div className="container" data-aos="fade-up">
                <div className="row">
                    <div className="col-lg-4 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay={100}>
                        <div className="content">
                            <h3>Why choose us</h3>
                            <p>
                                Vihiga County Referral Hospital is dedicated to delivering outstanding healthcare
                                services to the inhabitants of Vihiga County and the neighboring community. Our goal is
                                to enhance the overall health of the community by offering thorough and empathetic
                                medical care.
                            </p>
                            <div className="text-center">
                                <Link href={`services`}>
                                    <a  className="more-btn">
                                       All Services <Icon icon='bx:chevron-right' className='icon'/>
                                    </a>
                                </Link>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 d-flex align-items-stretch">
                        <div className="services-boxes d-flex flex-column justify-content-center">
                            <div className="row">
                                {servicesData.map((service, index) => (
                                    <div key={index} className="col-xl-4 d-flex align-items-stretch" data-aos="zoom-in"
                                         data-aos-delay={service.delay}>
                                        <div className="service-box mt-4 mt-xl-0">
                                            <Icon icon={service.icon} className='icon'/>
                                            <h4>{service.title}</h4>
                                            <p>{service.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VihigaHospitalInfo;

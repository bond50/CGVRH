import React from 'react';
import { Icon } from "@iconify/react";
import Link from "next/link";
import styles from '../../styles/HospitalOverview.module.css';

const servicesData = [
    {
        icon: 'material-symbols-light:medical-services-outline-rounded',
        title: 'Comprehensive Medical Services',
        description: 'We offer a full range of medical services to meet the diverse needs of our community.',
        delay: 200
    },
    {
        icon: 'fluent-emoji-high-contrast:health-worker',
        title: 'Expert Healthcare Professionals',
        description: 'Our team of skilled professionals is committed to providing exceptional healthcare.',
        delay: 300
    },
    {
        icon: 'guidance:mri-pet',
        title: 'Modern Facilities',
        description: 'Our hospital is equipped with the latest technology to ensure the best patient care.',
        delay: 400
    },
];

const HospitalOverview = () => {
    return (
        <section className={styles.hospitalOverview}>
            <div className="container" data-aos="fade-up">
                <div className="row">
                    <div className="col-lg-4 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay={100}>
                        <div className={styles.content}>
                            <h3>Why Choose Us</h3>
                            <p>
                                At Vihiga County Referral Hospital, we are dedicated to delivering top-notch healthcare services to the residents of Vihiga County and the surrounding areas. Our mission is to improve the health and well-being of our community through compassionate and comprehensive medical care.
                            </p>
                            <div className="text-center">
                                <Link href="/services">
                                    <a className={styles.moreBtn}>
                                        Explore Our Services <Icon icon='bx:chevron-right' className={styles.icon} />
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 d-flex align-items-stretch">
                        <div className={`servicesBoxes d-flex flex-column justify-content-center ${styles.servicesBoxes}`}>
                            <div className="row">
                                {servicesData.map((service, index) => (
                                    <div key={index} className="col-xl-4 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay={service.delay}>
                                        <div className={`serviceBox mt-4 mt-xl-0 ${styles.serviceBox}`}>
                                            <Icon icon={service.icon} className={styles.icon} />
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

export default HospitalOverview;

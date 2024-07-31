import React from 'react';
import {YearsOperated} from "../years-operated/YearsOperated";
import Link from "next/link";
import {APP_NAME} from "../../config";
import styles from '../../styles/About.module.css';

const About = () => {
    return (
        <section className={styles.homepageAbout}>
            <div className="container" data-aos="slide-up">
                <div className="section-title">
                    <h2>About</h2>
                    <h3>Brief History about <span>{APP_NAME}</span></h3>
                    {/* <p>Explore our commitment to quality healthcare at Vihiga County Referral Hospital, serving the community for over <YearsOperated /> years</p> */}
                </div>

                <div className={`row ${styles.content}`}>
                    <div className="col-lg-6">
                        <p className="pt-0 mt-0">
                            {APP_NAME} <span>(VCRH)</span> is a level 4 government healthcare facility located in Vihiga
                            County, along Kisumu-Kakamega road, at Mbale Center, opposite County Headquarters.
                        </p>
                        <p>
                            {APP_NAME} has offered services to the people of Vihiga and its environs for the
                            last <YearsOperated/> years.
                        </p>
                        <p>
                            At inception, it was referred to as the Vihiga District Hospital and later renamed following
                            the devolution of health services in Kenya.
                        </p>
                    </div>
                    <div className="col-lg-6 pt-0">
                        <p>
                            {APP_NAME} is among the referral hospitals in Kenya previously owned by the Ministry of
                            Medical Services, which was delegated to County Governments.
                        </p>
                        <p>
                            {APP_NAME} first opened its doors to the public in 2001 under the Ministry of Health to
                            serve the population of the former Vihiga District. It has a 164-bed capacity with 108% bed
                            occupancy, including 6 wards: General Male and Female, Maternity and Pediatric, Amenity, and
                            ICU wards.
                        </p>
                        <Link href="/about-us">
                            <a className={styles.btn}>Learn More About VCRH</a>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

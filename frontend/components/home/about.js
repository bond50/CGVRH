import React from 'react';
import {YearsOperated} from "../years-operated/YearsOperated";
import Link from "next/link";
import Wave from "../shapes/wave";
import TopWaveInverted from "../shapes/top-wave-inverted";
import {APP_NAME} from "../../config";

const About = () => {
    return (
        <section id='homepage-about' className='homepage-about'>
            <div className="container" data-aos="slide-up">
                <div className="section-title">
                    <h2>About</h2>
                    <h3>Brief History about <span>{APP_NAME}</span></h3>
                    {/*<p>Explore our commitment to quality healthcare at Vihiga County Referral Hospital, serving the*/}
                    {/*    community for over <YearsOperated/> years</p>*/}
                </div>

                <div className={`row content `}>
                    <div className="col-lg-6  ">
                        <p className='pt-0 mt-0'>
                            Vihiga County Referral Hospital <span>(VCRH)</span> is a level 4 government healthcare
                            facility located in
                            Vihiga County,along
                            Kisumu-Kakamega road,at Mbale Center ,Opposite County Headquarters.
                        </p>
                        <p>{APP_NAME} has offered services to the people of Vihiga and its environs for the
                            last <YearsOperated/> years.</p>
                        <p> At inception it was referred to as the Vihiga District Hospital and later renamed
                            following devolution of health services in Kenya
                        </p>

                    </div>
                    <div className="col-lg-6  pt-0">
                        <p>
                            {APP_NAME} is among
                            the referral hospitals in Kenya previously owned by the Ministry of Medical Services
                            which was delegated to County Governments.</p>
                        <p> {APP_NAME} first opened its door its doors to the public in
                            the year 2001 under the Ministry of
                            Health to serve the population of the former Vihiga District.
                            It has 164 bed capacity with 108% bed occupancy with 6 wards which include general Male
                            and Female ,Maternity and paediatric,Amenity and ICU wards.
                        </p>
                        <Link href={`/about-us`}>
                            <a className='btn'>Learn More About Us</a>
                        </Link>

                    </div>

                </div>
            </div>

        </section>
    );
};

export default About;
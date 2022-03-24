import React from 'react';
import {YearsOperated} from "../years-operated/YearsOperated";
import Link from "next/link";

const About = () => {
    return (
        <section id='homepage-about' className='homepage-about'>
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>About Us</h2>
                </div>
                <div className={`row content `}>
                    <div className="col-lg-6  ">
                        <p className='pt-0 mt-0'>
                            Vihiga County Referral Hospital <span>(VCRH)</span> is a level 5 government healthcare
                            facility located in
                            Vihiga County,along
                            Kisumu-Kakamega road,at Mbale Center ,Opposite County Headquarters.
                            VCRH has offered services to the people of Vihiga and its environs for the
                            last <YearsOperated/> years.
                            At interception it was referred to as the Vihiga District Hospital and later renamed
                            following devolution of health services in Kenya.In august 2017, the facility was gazetted
                            to be a leval 5 referral hospital.
                        </p>

                    </div>
                    <div className="col-lg-6  pt-0">
                        <p>
                            Delivering high quality healthcare to the community is our core function . We are among
                            the referral hospitals in Kenya previously owned by the Ministry of Medical Services
                            which was transfered to County Governments and serve a large and diverse population of
                            662,596 persons in Vihiga County.</p>
                        <p>VCRH first opened its door its doors to the public in
                            the year 2001 under the Ministry of
                            Health to serve the population of the former Vihiga District.
                            It has 164 bed capacity with 108% bed occupancy with 6 wards which include general Male
                            and Female ,Maternity and paediatric,Amenity and ICU wards.
                        </p>
                        <Link href={`/about-us`}>
                            <a className='btn'>Read more about the facility here </a>
                        </Link>

                    </div>
                </div>
            </div>

        </section>
        // <section className={classes.Section}>
        //     <div className={`container`} data-aos="fade-up">
        //         <div className="row gx-0" data-aos="fade-up">
        //             <div className="col-lg-8 d-flex flex-column justify-content-center">
        //                 <div className={classes.Content}>
        //                     <h3>Welcome to</h3>
        //                     <h2>Vihiga County Referral Hospital </h2>
        //                     <p>The Vihiga County Referral Hospital is in kenya,Vihiga County,along
        //                         kisumu-Kakamega road,at Mbale Center ,Opposite District Headquarters</p>
        //                     <p>
        //                         We have been offering our quality and affordable services to residents of vihiga county
        //                         and its neighborhood for <YearsOperated/> years now
        //                         .We value and hence take care of your precious health
        //                     </p>
        //
        //                     {/*<div className="text-center text-lg-start">*/}
        //                     {/*    <Link href={`/about/strategic-plan`}>*/}
        //                     {/*        <a*/}
        //                     {/*            className={`${classes.Button} d-inline-flex align-items-center justify-content-center align-self-center`}>*/}
        //                     {/*            <span>Read More</span>*/}
        //                     {/*            <i className="bi bi-arrow-right"/>*/}
        //                     {/*        </a>*/}
        //                     {/*    </Link>*/}
        //                     {/*</div>*/}
        //                 </div>
        //             </div>
        //             <div className={`col-lg-4 d-flex align-items-center ${classes.Img}`}>
        //                 <Image
        //                     src="/herp.jpg"
        //                     className={`img-fluid ${classes.Animated}`} alt="home" width={600} height={400}/>
        //
        //             </div>
        //         </div>
        //     </div>
        // </section>
    );
};

export default About;
import React from 'react';
import Link from 'next/link';
import classes from '../../styles/Strategic.module.css'
import styles from '../../styles/Util.module.css'
import {YearsOperated} from "../years-operated/YearsOperated";
import Image from "next/image";

const Strategic = () => {
    return (
        <section className={styles.Section}>
            <div className="container " data-aos='zoom-out' data-aos-once='true'>
                <div className="row gx-0">
                    <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-right"
                         data-aos-once='true'>
                        <div className={classes.Content}>
                            <h3>Welcome to</h3>
                            <h2>Vihiga County Referral Hospital </h2>
                            <p>The Vihiga County Referral Hospital is in kenya,Vihiga County,along
                                kisumu-Kakamega road,at Mbale Center ,opposite Headquarters</p>
                            <p>
                                We have been offering our quality and affordable services to residents of vihiga county
                                and its neighborhood for <YearsOperated/> years now
                                .We value and hence take care of your precious health
                            </p>

                            <div className="text-center text-lg-start">
                                <Link href={`/about/plan`}>
                                    <a
                                        className={`${classes.Button} d-inline-flex align-items-center justify-content-center align-self-center`}>
                                        <span>Read More</span>
                                        <i className="bi bi-arrow-right"/>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={`col-lg-6 d-flex align-items-center ${classes.Img}`} data-aos="fade-left"
                         data-aos-once='true'>
                        <Image
                            src="https://res.cloudinary.com/dwtcilinl/image/upload/v1622297993/Gallery/yffhwkqackates3w0hte.png"
                            className={`img-fluid ${classes.Animated}`} alt="home" layout='fill'/>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Strategic;
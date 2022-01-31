import React from 'react';
import Link from 'next/link';
import classes from '../../styles/Strategic.module.css'
import {YearsOperated} from "../years-operated/YearsOperated";
import Image from "next/image";

const Strategic = () => {
    return (
        <section className={classes.Section}>
            <div className= {`container ${classes.Container}`}  data-aos="fade-up" >
                <div className="row gx-0"  data-aos="fade-up" >
                    <div className="col-lg-8 d-flex flex-column justify-content-center" >
                        <div className={classes.Content} >
                            <h3>Welcome to</h3>
                            <h2>Vihiga County Referral Hospital </h2>
                            <p>The Vihiga County Referral Hospital is in kenya,Vihiga County,along
                                kisumu-Kakamega road,at Mbale Center ,Opposite District  Headquarters</p>
                            <p>
                                We have been offering our quality and affordable services to residents of vihiga county
                                and its neighborhood for <YearsOperated/> years now
                                .We value and hence take care of your precious health
                            </p>

                            {/*<div className="text-center text-lg-start">*/}
                            {/*    <Link href={`/about/strategic-plan`}>*/}
                            {/*        <a*/}
                            {/*            className={`${classes.Button} d-inline-flex align-items-center justify-content-center align-self-center`}>*/}
                            {/*            <span>Read More</span>*/}
                            {/*            <i className="bi bi-arrow-right"/>*/}
                            {/*        </a>*/}
                            {/*    </Link>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <div className={`col-lg-4 d-flex align-items-center ${classes.Img}`} >
                        <Image
                            src="/herp.jpg"
                            className={`img-fluid ${classes.Animated}`} alt="home" width={600} height={400}/>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Strategic;
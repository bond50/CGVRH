import React from 'react';
import Link from 'next/link';
import classes from '../../styles/Strategic.module.css'
import styles from '../../styles/Util.module.css'

const Strategic = () => {
    return (
        <section className={styles.Section}>
            <div className="container " data-aos='zoom-out' data-aos-once='true'>

                <div className="row gx-0">
                    <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-right"
                         data-aos-once='true'>
                        <div className={classes.Content}>
                            <h3>Our Plan</h3>
                            <h2>Strategic plan 2018-2022 </h2>
                            <p>VCRH undertook the process to develop a
                                strategic plan for the year2018-2022.
                                The entire hospital staff participated in carrying out of a situational analysis that
                                set
                                up the basis of development of the plan
                            </p>

                            <p>
                                The strategic plan is inclusive of a monitoring and evaluation process that will review
                                the
                                implementation of the established goals at its different phases. Implementation of the
                                strategic plan will require financial investment of 2.2 billion Kenya shillings
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
                        <Link href={`/media/gallery`}>
                            <img
                                src="https://res.cloudinary.com/dwtcilinl/image/upload/v1622298033/Gallery/k88blwkaj7i5r4hg41qh.jpg"
                                className={`img-fluid ${classes.Animated}`} alt="home"/>
                        </Link>
                    </div>


                </div>


            </div>

        </section>
    );
};

export default Strategic;
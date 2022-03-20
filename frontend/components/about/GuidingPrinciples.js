import classes from '../../styles/Principles.module.css'
import styles from '../../styles/AboutContainer.module.css'
import React from "react";

const GuidingPrinciples = () => {
    return <section className={styles.Section}>
        <div className="container">
            <div className="section-title">
                <h2> Guiding Principles </h2>

            </div>
            <div className="row">
                <div className="col-md-6 d-flex align-items-stretch">
                    <div className={`card ${classes.Card}`} style={{
                        backgroundImage:
                            'url(' +
                            '/values/image1.jpeg' +
                            ')'
                    }}>
                        <div className={`card-body ${classes.CardBody}`}>
                            <h5 className={`card-title ${classes.CardTitle}`}><a href="">Our Mission</a></h5>
                            <p className={`card-text ${classes.CardText}`}>To provide quality preventive, curative and
                                rehabilitative health care services.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                    <div className={`card ${classes.Card}`} style={{
                        backgroundImage:
                            'url(' +
                            '/values/image2.jpeg' +
                            ')'
                    }}>
                        <div className={`card-body ${classes.CardBody}`}>
                            <h5 className={`card-title ${classes.CardTitle}`}><a href="">Our Vision</a></h5>
                            <p className={`card-text ${classes.CardText}`}> A facility of choice in health care
                                provision</p>

                        </div>
                    </div>

                </div>
                <div className="col-md-6 d-flex align-items-stretch mt-4">
                    <div className={`card ${classes.Card}`} style={{
                        backgroundImage:
                            'url(' +
                            '/values/image3.jpeg' +
                            ')'
                    }}>
                        <div className={`card-body ${classes.CardBody}`}>
                            <h5 className={`card-title ${classes.CardTitle}`}><a href="">Our Core values</a></h5>
                            <p className={`card-text ${classes.CardText}`}>
                                Accountability,
                                Commitment,
                                Integrity,
                                Teamwork,
                                Innovation,
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
};

export default GuidingPrinciples;
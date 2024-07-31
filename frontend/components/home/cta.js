import React from 'react';
import { APP_NAME } from "../../config";
import styles from '../../styles/Cta.module.css';

const Cta = () => {
    return (
        <section className={styles.cta}>
            <div className="container" data-aos="zoom-in">
                <div className="row">
                    <div className="col-lg-9 text-center text-lg-start">
                        <h3 className={styles.ctaTitle}>In an Emergency?</h3>
                        <p className={styles.ctaText}>
                            In the event of an emergency, {`${APP_NAME} 's`} Emergency Unit operates around the clock, 24/7. <br />
                            Should you require immediate assistance, kindly utilize the <span>Call Now</span> button to connect with our dedicated emergency response team. <br />
                            If, for any reason, the button is not operational, please promptly contact us directly at <span>+254 723 103 564</span>. Your safety and well-being are our top priorities, and we are here to provide swift and professional assistance during urgent situations.
                        </p>
                    </div>
                    <div className={`col-lg-3 ${styles.ctaBtnContainer} text-center`}>
                        <a className={styles.ctaBtn} href="tel:+254723103564">Call Now</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cta;

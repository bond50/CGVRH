import React from 'react';
import Counter from "../counter/counter";
import { YearsOperated } from "../years-operated/YearsOperated";
import styles from '../../styles/HomeCounter.module.css';

const HomeCounter = () => {
    return (
        <section  className={styles.counts}>
            <div className="container" data-aos="fade-up">
                <div className="row gy-4">
                    <Counter
                        start={0}
                        end={YearsOperated()}
                        duration={5}
                        suffix=""
                        title="Years of Quality Service"
                        icon="guidance:time"
                        className={styles.countBox}
                        iconClassName={styles.icon}
                    />
                    <Counter
                        start={0}
                        end={15}
                        duration={5}
                        suffix="+"
                        title="Specialized Clinics"
                        icon="healthicons:ambulatory-clinic-outline"
                        className={styles.countBox}
                        iconClassName={styles.icon}
                    />
                    <Counter
                        start={0}
                        end={164}
                        duration={5}
                        suffix=""
                        title="Bed Capacity"
                        icon="carbon:hospital-bed"
                        className={styles.countBox}
                        iconClassName={styles.icon}
                    />
                    <Counter
                        start={0}
                        end={450}
                        duration={5}
                        suffix="+"
                        title="Employees"
                        icon="la:people-carry"
                        className={styles.countBox}
                        iconClassName={styles.icon}
                    />
                </div>
            </div>
        </section>
    );
};

export default HomeCounter;

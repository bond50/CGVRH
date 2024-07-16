import React from 'react';
import Counter from "../counter/counter";
import { YearsOperated } from "../years-operated/YearsOperated";

const HomeCounter = () => {
    return (
        <section id="counts" className="counts section-bg">
            <div className="container" data-aos="fade-up">
                <div className="row gy-4">
                    <Counter
                        start={0}
                        end={YearsOperated()}
                        duration={5}
                        suffix=""
                        title="Years of Quality Service"
                        icon="guidance:time"
                    />
                    <Counter
                        start={0}
                        end={15}
                        duration={5}
                        suffix="+"
                        title="Specialized Clinics"
                        icon="healthicons:ambulatory-clinic-outline"
                    />
                    <Counter
                        start={0}
                        end={164}
                        duration={5}
                        suffix=""
                        title="Bed Capacity"
                        icon="carbon:hospital-bed"
                    />
                    <Counter
                        start={0}
                        end={450}
                        duration={5}
                        suffix="+"
                        title="Employees"
                        icon="la:people-carry"
                    />
                </div>
            </div>
        </section>
    );
};

export default HomeCounter;

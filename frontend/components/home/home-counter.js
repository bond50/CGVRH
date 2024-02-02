import React from 'react';
import Counter from "../counter/counter";
import {YearsOperated} from "../years-operated/YearsOperated";

const HomeCounter = () => {

    return (<section id="counts" className="counts section-bg">
        <div className="container" data-aos="fade-up">
            <div className="row gy-4">
                <Counter
                    start={0}
                    end={YearsOperated()}
                    duration={5} suffix=""
                    title="Years of quality service"
                    icon='guidance:time'
                />
                <Counter
                    start={0}
                    end={15}
                    duration={5}
                    suffix="+"
                    title="Specialized clinics"
                    icon='healthicons:ambulatory-clinic-outline'/>
                <Counter
                    start={0}
                    end={164}
                    duration={5}
                    suffix=""
                    icon='carbon:hospital-bed'
                    title="Bed Capacity"/>
                <Counter
                    start={0}
                    end={450}
                    duration={5}
                    suffix="+"
                    icon='la:people-carry'
                    title="Employees"/>

            </div>
        </div>
    </section>);
};

export default HomeCounter;
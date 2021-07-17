import React from 'react';
import styles from "../../styles/AboutContainer.module.css";


const Goals = () => {


    const list = [
        {title: 'Vihiga county department of health envisions a county that is healthy and nationally competitive. It is mandated with prioritizing county level health investments, setting and reporting on relevant targets; and coordination of actors in the county health system, planning, development and monitoring of county health services. This is to ensure compliance with national health standards, providing guidance to health facilities within the county in implementing health service tariffs and benefits, developing and managing referral services within the county health system and other referral health facilities. Its strategic goal is to accelerate attainment of universal health care.'},
        {title: 'Delivering high quality health care to the community is a core function of VihigaCounty Referral Hospital (VCRH). It is among the referral hospitals in Kenya previously owned by the Ministry of Medical Services recently transferred to the county governments and serves a large and diverse population of 662,596 persons in Vihiga County.'},
        {title: 'VCRH first opened its doors to the public in the year 2001 under the the Ministry of Health to serve the population of the former Vihiga District.It has a 164 bed capacity with 108% bed occupancy in 4 wards which include general male and female wards, maternity and pediatric wards. The hospital maternity section has 47 beds and 10 incubators.'},
        {title: 'Like many county hospitals, VCRH faces significant challenges such asa growing and diverse population with corresponding increase in the disease burden, lack of sufficient funding and a deficit in human resources for health'},

    ]


    return <section className={`${styles.Section} ${styles.SectionBg}`}>
        <div className={styles.SectionTitle}p data-aos="fade-up" data-aos-once='true'>
            <h2>Our <strong>Goals</strong></h2>
        </div>
        <div className="container">
            <div data-aos="fade-up" data-aos-once={`true`}>
                {list.map((l, i) => {
                    return <p key={i}>
                        {l.title}
                    </p>
                })}
            </div>
        </div>
    </section>
};

export default Goals;
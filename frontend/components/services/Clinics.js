import AboutContainer from "../reusables/AboutContainer";
import styles from "../../styles/AboutContainer.module.css";
import React from "react";

const Clinics = () => {
    const list = [
        {
            header: 'Medical Outpatient Clinic (MOPC):',
            desc: 'Every Monday and Friday 8am -1pm',
        },
        {
            header: 'Surgical Outpatient Clinic (SOPC):',
            desc: 'Every Wednesday 8am -1pm',
        },
        {
            header: 'Paediatric Outpatient Clinic (POPC):',
            desc: 'Every Thursday 8am -1pm',
        }, {
            header: 'Gynaecological Outpatient Clinic (GOPC):',
            desc: 'Every Thursday 8am -1pm',
        }, {
            header: 'Eye Clinic :',
            desc: 'Monday - Friday 8am -4pm',
        }, {
            header: 'Psychiatric Clinic :',
            desc: 'Monday - Friday 8am -4pm',
        }, {
            header: 'Orthopaedic Clinic :',
            desc: 'Monday - Friday 8am -4pm',
        },
    ]

    return <AboutContainer title={`Role`} para={`Our Roles in the county`}>
        <p>
            VCRH plays its roles in the county by providing a wide range of health services in partnership
            with the greater community and other institutions.
            Some of the roles played by the hospital in the county include
        </p>

        <div className="container" data-aos="fade-up">
            <div className={` ${styles.Content}`}>
                <div className="pt-4 pt-lg-0" data-aos="fade-up" data-aos-once={`true`}>
                    <ul>
                        {list.map((l, i) => {
                            return <li key={i}
                            ><i className="bi bi-check2-all"/>
                                <p>{l.header}</p>
                                {l.desc}
                            </li>
                        })
                        }
                    </ul>
                </div>
            </div>
        </div>
    </AboutContainer>
};

export default Clinics;
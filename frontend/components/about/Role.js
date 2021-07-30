import React from 'react';
import styles from "../../styles/AboutContainer.module.css";
import AboutContainer from "../reusables/AboutContainer";


const Board = () => {
    const list = [

        {name: 'Acting as a county referral hospitals for the 3 sub county hospitals and as an intermediary to the National and Teaching referral hospitals.',},
        {name: 'The implementation of health policy at facility level and maintaining quality standards.',},
        {name: 'Serving as a county center for provision of specialized health care..',},
        {name: 'Providing technical support to sub-county hospitals and health centers.',},
        {name: 'Offering teaching and training for health care personnel such as nurses, medical interns, pharmacist interns, pharmaceutical technologist interns,laboratory technologists, health records and information officers and nutritionists.',},

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
                                {l.name}
                            </li>
                        })
                        }
                    </ul>
                </div>
            </div>
        </div>
    </AboutContainer>
};

export default Board;
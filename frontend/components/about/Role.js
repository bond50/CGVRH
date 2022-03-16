import React from 'react';
import styles from "../../styles/AboutContainer.module.css";


const Board = () => {
    const list = [

        {name: 'Acting as a county referral hospitals for the 3 sub county hospitals and as an intermediary to the National and Teaching referral hospitals.',},
        {name: 'The implementation of health policy at facility level and maintaining quality standards.',},
        {name: 'Serving as a county center for provision of specialized health care..',},
        {name: 'Providing technical support to sub-county hospitals and health centers.',},
        {name: 'Offering teaching and training for health care personnel such as nurses, medical interns, pharmacist interns, pharmaceutical technologist interns,laboratory technologists, health records and information officers and nutritionists.',},

    ]


    return <section className='section-bg'>
        <div className="container" data-aos="fade-up">
            <div className="section-title">
                <h2>Roles we play in the county</h2>
                <p>
                    VCRH plays its roles in the county by providing a wide range of health services in partnership
                    with the greater community and other institutions.
                    Some of the roles played by the hospital in the county include
                </p>
            </div>
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
    </section>
};

export default Board;
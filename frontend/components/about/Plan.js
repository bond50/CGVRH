import Link from "next/link";
import React from "react";
import styles from "../../styles/AboutContainer.module.css";

const Plan = () => {
    const list = [{
        name: "To have an effective and efficient hospital management, leadership and governance system.",
    },
        {
            name: "To broaden the scope and enhance the quality of clinical services",
        },
        {
            name: "To optimize health workforce size, skills, motivation and distribution",
        },
        {name: "To have an efficient health management and information syste."},
        {name: "To modernize and revolutionize health infrastructure"},
        {
            name: "To increase resource mobilization, streamline budgeting and expenditure processes and strengthen accountability systems",
        },
        {
            name: "ensure availability and rational use of effective, safe and affordable health products and technologies",
        },
    ];

    return (
        <section className={`section-bg`}>
            <div className="container" data-aos="fade-up">
                <div className='section-title'>
                    <h2> VCRH Strategic Plan </h2>
                    <p> The Office of the medical superintendent </p>
                </div>
                <div className={`row  ${styles.Content}`}>
                    <div className="col-lg-6"
                         data-aos="fade-up">
                        <p>
                            The Constitution of Kenya 2010 grants Kenyans several rights among them being the right to
                            health.Article 43(1)(a) guarantees every person the right to the highest attainable
                            standards of
                            health care services.This hospital strategic plan is aligned to the Health strategic and
                            Investment Plan, the County Integrated Development Plan(CIDP), the National Health Strategic
                            Plan(NHSP),
                            the Medium Term Expenditure Framework(MTEF) Budgetary System and the Vision 2030. </p>

                        <p>
                            This is the first hospital strategic plan
                            for Vihiga County Referral Hospital since its inception in 2002 then known as Vihiga
                            District Hospital.The formulation of this strategic plan has been an elaborate and
                            consultative process involving the hospital staff, the Hospital Management Team(HMT), the
                            Hospital Management Committee(HMC) and the leadership of the department of health
                            VihigaCounty.The GIZ has been an instrumental partner in making the planning process a
                            success.
                        </p>
                        <p>
                            The Strategic Planning Committee(SPC) carried out a situational analysis and subsequently
                            developed strategic objectives in line with the Ministry of Health policies and
                            guidelines.The
                            plan is to be implemented over a five year period(2018– 2022) with monitoring and evaluation
                            at
                            certain points of the duration.The focus of the strategic plan is to enable the hospital to
                            operate effectively as a level 5 referral health institution in Vihiga County and its
                            environs. {" "}
                        </p>
                    </div>
                    <div className="col-lg-6 pt-4 pt-lg-0"
                         data-aos="fade-up">
                        <p>
                            The hospital management is keen to work with staff and stakeholders to make the plan a
                            reality and to fulfill the goal of making the institution a health facility of choice in the
                            region at large. {" "}
                        </p>

                        <p> The strategic objectives of the strategic plan are: </p>
                        <ul> {
                            list.map((l, i) => {
                                return (
                                    <li key={i}>
                                        <i className="bi bi-check2-all"/> {l.name}
                                    </li>
                                );
                            })
                        }
                        </ul>
                        <p className="fst-italic">
                            Dr.Ayodi Lusigi < br/>
                            medical superintendent <br/>
                            Vihiga County and Referral Hospital < br/>
                        </p>
                        <div className="alert alert-link ">
                            <Link
                                href={`https://res.cloudinary.com/dwtcilinl/raw/upload/v1648102439/documents/hhw57tsgaookmiktzb4d.docx`}>
                                <a>
                                    Click here to download full strategic plan for 2018 - 2022 period
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Plan;
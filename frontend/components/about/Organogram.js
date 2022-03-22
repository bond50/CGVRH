import React from "react";
import Accordion from 'react-bootstrap/Accordion'
import List from "../reusables/List";

const Organogram = () => {
    const medsupList = [
        {
            content: [
                {name: 'Medical Superintendent is the head of the facility.',},
                {name: 'Responsible for supervision of clinical and administrative functions at the facility.',},
                {name: 'He is the secretary to the hospital board and the chair of the hospital management team and the Executive expenditure committee.',},
                {name: 'Serves as the hospital spokesman.',},
            ]
        },
    ]

    const nursingOfficer = [
        {
            content: [
                {name: 'Is in charge of all the nurses at the facility and serves as the custodian of nursing care within the institution.',},
                {name: 'She also supervises auxiliary services including nutrition, comprehensive care clinic, Laundry and Social work.',},
            ]
        },
    ]

    const dmedsupList = [
        {
            content: [
                {name: 'Acts as the principal assistant to the Medical Superintendent performing duties in his absence or under delegation of the Medical Superintendent.',},
            ]
        },
    ]

    const admin = [
        {
            content: [
                {name: 'He serves as the immediate supervisor of administrative functions at the facility. This includes Human Resource, Supply Chain Management, Finance, Transport, Security, Housing, Maintenance and Biomedical engineering.',},
                {name: 'He is the secretary to the EEC and the HMT.',},
            ]
        },
    ]

    const co = [
        {
            content: [
                {name: 'Acts as the immediate supervisor for all clinical services at the facility.',},
                {name: 'He supervises Consultants, Specialists, Medical Officers, and Clinical Officers, interns and students on clinical attachment.\n.',},
                {name: 'He also supervises Pharmacy and Diagnostics at the facility.',},
            ]
        },
    ]

    const list = [
        {
            eventKey: "1",
            title: "Medical Superintendent",
            comp: <List list={medsupList}/>
        },
        {
            eventKey: "2",
            title: "Deputy Medical Superintendent",
            comp: <List list={dmedsupList}/>
        },
        {
            eventKey: "3",
            title: "Nursing officer in charge",
            comp: <List list={nursingOfficer}/>
        },
        {
            eventKey: "4",
            title: "Hospital Administrator",
            comp: <List list={admin}/>
        },
        {
            eventKey: "5",
            title: "Head of clinical services",
            comp: <List list={co}/>
        },

    ]
    return <section id="organogram" className="organogram section-bg">
        <div className="container" data-aos="fade-up">
            <div className="row">
                <div className="section-title">
                    <h2>Our Management Structure</h2>
                    <p>Vihiga County Referral Hospital is the main hospital within Vihiga County serving as a referral
                        facility
                        for
                        Sub County and Health centers within the County. It attained its level five status in August
                        2017.
                        The
                        hospital has an integrated organizational structure with various departments and committees
                        working
                        to
                        ensure good leadership and governance at the facility
                    </p>
                </div>


                <div className="accordion-list" data-aos="fade-up">
                    {list.map(item => (
                        <Accordion defaultActiveKey="1" key={item.eventKey}>
                            <Accordion.Item eventKey={item.eventKey}>
                                <Accordion.Header><span>{`0${item.eventKey}`}</span>{item.title}
                                </Accordion.Header>
                                <Accordion.Body>
                                    {item.comp}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))}
                </div>
            </div>
        </div>

    </section>;
};

export default Organogram;
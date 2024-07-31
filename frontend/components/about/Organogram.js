import React from 'react';
import List from "../reusables/List";
import Accordion from '../reusables/Accordion';
import styles from '../../styles/Organogram.module.css';

const roles = [
    {
        title: "Medical Superintendent",
        content: [
            { name: 'Medical Superintendent is the head of the facility.' },
            { name: 'Responsible for supervision of clinical and administrative functions at the facility.' },
            { name: 'He is the secretary to the hospital board and the chair of the hospital management team and the Executive expenditure committee.' },
            { name: 'Serves as the hospital spokesman.' },
        ]
    },
    {
        title: "Deputy Medical Superintendent",
        content: [
            { name: 'Acts as the principal assistant to the Medical Superintendent.' },
            { name: 'Coordinates medical services at the facility.' },
        ]
    },
    {
        title: "Nursing Services Manager",
        content: [
            { name: 'Is in charge of all the nurses at the facility.' },
            { name: 'Serves as the custodian of nursing care within the institution.' },
            { name: 'Supervises auxiliary services including nutrition, comprehensive care clinic, Laundry and Social work.' },
        ]
    },
    {
        title: "Senior Health Administrative Officer",
        content: [
            { name: 'Serves as the immediate supervisor of administrative functions at the facility.' },
            { name: 'Oversees Human Resource, Supply Chain Management, Finance, Transport, Security, Housing, Maintenance, and Biomedical engineering.' },
            { name: 'Is the secretary to the Executive Expenditure Committee and the Hospital Management Team.' },
        ]
    },
    {
        title: "Laboratory Incharge",
        content: [
            { name: 'Oversees laboratory operations, ensuring accurate and timely diagnostic testing.' },
            { name: 'Manages laboratory staff and ensures compliance with safety and quality standards.' },
        ]
    },
    {
        title: "Pharmacy Incharge",
        content: [
            { name: 'Responsible for managing the pharmacy and ensuring the availability of medicines and supplies.' },
            { name: 'Supervises pharmacy staff and ensures compliance with regulations and best practices.' },
        ]
    },
    {
        title: "Rehabilitative Services Incharge",
        content: [
            { name: 'Manages rehabilitative services including physical therapy and occupational therapy' },
            { name: 'Ensures quality care and supervises rehabilitative staff.' },
        ]
    },
    {
        title: "Radiology Incharge",
        content: [
            { name: 'Manages radiology services, ensuring high-quality imaging and diagnostic services.' },
            { name: 'Supervises radiology staff at the facility' },
        ]
    },

    {
        title: "Nutrition Incharge",
        content: [
            { name: 'Provides nutritional services and counseling.' },
            { name: 'Supervises nutrition-related activities and staff.' },
        ]
    },
    {
        title: "Ophthalmology Incharge",
        content: [
            { name: 'Manages ophthalmology services, ensuring quality eye care.' },
            { name: 'Supervises ophthalmology staff and operations.' },
        ]
    },
    {
        title: "Health Records Incharge",
        content: [
            { name: 'Manages patient health records, ensuring accuracy, privacy, and compliance with regulations.' },
            { name: 'Oversees the health information management team.' },
        ]
    },
    {
        title: "Dental Incharge",
        content: [
            { name: 'Provides dental care and supervises dental services.' },
            { name: 'Ensures compliance with dental care standards.' },
        ]
    },
    {
        title: "Biomedical Engineering Incharge",
        content: [
            { name: 'Oversees biomedical engineering services.' },
            { name: 'Ensures the maintenance and functionality of medical equipment.' },
        ]
    },
    {
        title: "Medical Social Work Incharge",
        content: [
            { name: 'Provides social work services to patients and their families.' },
            { name: 'Coordinates with other departments to ensure comprehensive care.' },
        ]
    },
    {
        title: "Accident & Emergency Incharge",
        content: [
            { name: 'Manages the accident and emergency department.' },
            { name: 'Ensures prompt and effective emergency care.' },
        ]
    },
    {
        title: "OPD/MCH Incharge",
        content: [
            { name: 'Oversees outpatient and maternal child health services.' },
            { name: 'Ensures comprehensive care for outpatient and maternal child health patients.' },
        ]
    },
    {
        title: "OBS/GYN Incharge",
        content: [
            { name: 'Manages obstetrics and gynecology services.' },
            { name: 'Ensures quality care for maternal and women’s health.' },
        ]
    },
    {
        title: "Public Health Incharge",
        content: [
            { name: 'Oversees public health initiatives and programs.' },
            { name: 'Ensures the implementation of public health policies.' },
        ]
    },

    {
        title: "CCC/TB Incharge",
        content: [
            { name: 'Oversees the comprehensive care clinic and TB services.' },
            { name: 'Ensures quality care for chronic conditions and TB patients.' },
        ]
    },
    {
        title: "Support Staff Incharge",
        content: [
            { name: 'Provides support services including transport, infrastructure, security and cleaning.' },
            { name: 'Ensures efficient and effective support operations.' },
        ]
    },
    {
        title: "Nurse Coverage",
        content: [
            { name: 'Ensures adequate nursing coverage for all shifts.' },
            { name: 'Coordinates with nursing staff to manage schedules and assignments.' },
        ]
    },
    {
        title: "Transport",
        content: [
            { name: 'Oversees transportation services for the hospital.' },
            { name: 'Ensures availability and maintenance of hospital vehicles.' },
        ]
    },

    {
        title: "Finance",
        content: [
            { name: 'Oversees the financial operations of the hospital.' },
            { name: 'Ensures proper management of hospital funds and budgets.' },
        ]
    },
    {
        title: "HR & Chaplaincy",
        content: [
            { name: 'Manages human resources and chaplaincy services.' },
            { name: 'Ensures the welfare of staff and spiritual support for patients.' },
        ]
    },
    {
        title: "Procurement",
        content: [
            { name: 'Manages the procurement of hospital supplies and equipment.' },
            { name: 'Ensures compliance with procurement policies and regulations.' },
        ]
    }
];

const Organogram = () => {
    const list = roles.map((role, index) => ({
        eventKey: `${index + 1}`,
        title: role.title,
        comp: <List list={[{ content: role.content }]} />
    }));

    return (
        <section className={styles.organogram}>
            <div className="container d-flex justify-content-center">
                <div className="col-lg-10">
                    <header className="section-title">
                        <h2>Hospital Management Structure</h2>
                    </header>
                    <Accordion list={list} />
                </div>
            </div>
        </section>
    );
};

export default Organogram;

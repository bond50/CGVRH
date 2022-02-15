import React from 'react';
import AboutContainer from "../reusables/AboutContainer";
import List from "../reusables/List";

const Records = () => {
    const list = [
        {
            content: [
                {name: 'Reception of patients / Clients',},
                {name: 'Collection ,analysis and dissemination of Health Information/ Data\n',},
                {name: 'Registration of patients',},
                {name: 'maintenance of confidentiality of patients information',},
                {name: 'Filing and retrieving patient files',},
                {name: 'Booking and preparation of clinics\n',},
                {name: 'Coding and indexing of diseases according to the ICD-10',},
            ]
        },
    ]

    return (
        <AboutContainer title='Health Records' para={`Health Records And Information Technology`}>
            <p>Health Records and information department manages health information data by ensuring its quality
                accuracy,accessibility and security in both paper and electronic systems</p>
            <p>By use of technology Health records and information Officers/ technicians classify , code and categorise
                patient information for databases and registries and maintain patient s medical and treatment
                histories</p>
            <p>other activities in the department includes :</p>
            <List list={list}/>

        </AboutContainer>
    );
};

export default Records;
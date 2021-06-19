import React from 'react';
import Accordion from "../../reusables/Accordion";
import AboutContainer from "../../reusables/AboutContainer";
import List from "../../reusables/List";
import Tat from "./Tat";
import OpeningHours from "./OpeningHours";
import Haematology from "./Haematology";
import BloodBank from "./BloodBank";
import Microbiology from "./Microbiology";
import ClinicalChemistry from "./ClinicalChemistry";
import Parasitology from "./Parasitology";


const Laboratory = () => {
    const accList = [
        {
            title: 'Operating Hours',
            content: () => <OpeningHours/>
        },

        {
            title: 'BLOOD BANK',
            content: () => <BloodBank/>
        },
        {
            title: 'PARASITOLOGY',
            content: () => <Parasitology/>
        },
        {
            title: 'Haematology',
            content: () => <Haematology/>
        },
        {
            title: 'Microbiology',
            content: () => <Microbiology/>
        },
        {
            title: 'Serology',
            content: () => <Tat/>
        },
        {
            title: 'Clinical chemistry',
            content: () => <ClinicalChemistry/>
        },

    ]

    const list = [
        {
            content: [
                {name: 'AGA KHAN HOSPITAL (Histology/ Cytology samples)',},
                {name: 'KEMRI-ALUPE (Viral Load and Samples for PCR-EID)',},

            ]
        },
    ]


    return (
        <AboutContainer title='Laboratory'>
            <h4>Accreditation</h4>
            <p>Not only do we have a well equipped Laboratory, but also talented staff who offer best services in
                the region. Our Laboratory is accredited as a medical testing laboratory upon satisfying the
                requirement of ISO 15189:2012.. by KENAS.</p>
            <h4>Location</h4>
            <p>The Vihiga County Referral Hospital Laboratory is in kenya,Vihiga County,along kisumu-Kakamega road,at
                Mbale Center ,within Vihiga County Referral Hospital, on basement next to X-ray unit</p>
            <p>We offer all routinely daily tests, blood donor services
                and in case of referral we refer our clients to the following facilities:</p>


            <List list={list}/>

            {accList.map((acc, i) => {
                return <Accordion key={i} title={acc.title.toUpperCase()}>
                    {acc.content()}
                </Accordion>
            })}

        </AboutContainer>


    );
};

export default Laboratory;
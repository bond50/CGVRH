import React from 'react';
import AboutContainer from "../reusables/AboutContainer";
import List from "../reusables/List";


const Partners = () => {
    const list = [
        {
            content: [
                {name: 'NHIF and community based organizations (CBOs).',},
                {name: 'CGV',},
                {name: 'Universal health coverage(UHC)',},
                {name: 'MOH',},
                {name: 'KEMRI/Welcome Trust',},
                {name: 'Masinde Muliro University Of Science And Technology',},
                {name: 'Maseno University',},
                {name: 'Moi University',},
                {name: 'KMTC',},
                {name: 'JKUAT',},
                {name: 'The ICT Authority (ICTA)',},
            ]
        },
    ]
    const intro = [
        {title: ' VCRH is collaborating with: '}]


    return <AboutContainer title=' Partners'>
        <List
            list={list}
            intro={intro}
        />

    </AboutContainer>;
};

export default Partners;
import React from 'react';
import AboutContainer from "../reusables/AboutContainer";
import List from "../reusables/List";

const Radiology = () => {
    const list = [
        {
            content: [
                {name: 'General Digital X-ray',},
                {name: 'Portable Digital X-ray',},
                {name: 'Mammography',},
                {name: 'OPG /Dental X-ray',},
                {name: 'Digital Ultrasound',},
                {name: 'CT scan (32 slice and 64 slice) services',},
            ]
        },
    ]


    return (
        <AboutContainer title='Imaging And Radiology Services'>
            <List list={list}/>


        </AboutContainer>
    );
};

export default Radiology;
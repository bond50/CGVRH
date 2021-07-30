import React from 'react';
import AboutContainer from "../reusables/AboutContainer";
import List from "../reusables/List";

const Ambulance = () => {
    const list = [
        {
            content: [
                {name: 'Referral In',},
                {name: 'Referral out',},
                {name: 'Transport Ambulance',},
            ]
        },
    ]


    return (
        <AboutContainer title='Ambulance' para={  `Ambulance Services`}>
            <List list={list}/>


        </AboutContainer>
    );
};

export default Ambulance;
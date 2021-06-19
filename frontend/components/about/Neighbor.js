import React from 'react';
import AboutContainer from "../reusables/AboutContainer";
import List from "../reusables/List";


const Board = () => {

    const intro = [
        {
            title: 'Vihiga County has 4 sub-county hospitals, 18 health centers, 23 dispensaries and a number of private and mission hospitals and clinics. The hospital serves as the county referral hospital and is gazetted as a level 5 health institution thus handling critical cases referred from the above lower level facilities. Cases requiring specialized care are referred from dispensaries/clinics (Level 2), health centers (Level 3), sub county hospitals and mission hospitals (Level 4)either sequentially or directly.'
        }]


    return <AboutContainer title='Neighbouring Facilities'>
        <List
            intro={intro}
        />

    </AboutContainer>;
};

export default Board;
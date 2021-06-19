import React from 'react';
import AboutContainer from "../reusables/AboutContainer";
import List from "../reusables/List";


const Project = () => {
    const list = [
        {
            content: [
                {name: 'Hospital plaza',},
                {name: 'Funeral Home',},
            ]
        },
    ]
    const intro = [
        {title: ' Current Projects at Vihiga County Referral Hospital are:'}]


    return <AboutContainer title='Our Projects'>
        <List
            list={list}
            intro={intro}
        />

    </AboutContainer>;
};

export default Project;
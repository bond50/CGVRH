import React from 'react';
import AboutContainer from "../reusables/AboutContainer";
import List from "../reusables/List";


const Board = () => {
    const list = [
        {
            content: [
                {name: 'Acting as a county referral hospitals for the 3 sub county hospitals and as an intermediary to the National and Teaching referral hospitals.\n',},
                {name: 'The implementation of health policy at facility level and maintaining quality standards.\n',},
                {name: 'Serving as a county center for provision of specialized health care.\n.',},
                {name: 'Providing technical support to sub-county hospitals and health centers.\n',},
                {name: 'Offering teaching and training for health care personnel such as nurses, medical interns, pharmacist interns, pharmaceutical technologist interns,laboratory technologists, health records and information officers and nutritionists.\n',},
            ]
        },
    ]
    const intro = [
        {
            title: ' VCRH plays its roles in the county by providing a wide range of health services in partnership with the greater community and other institutions.\n' +
                'Some of the roles played by the hospital in the county include;'
        }]


    return <AboutContainer title='Roles played by vihiga county referral hospital
'>
        <List
            list={list}
            intro={intro}
        />

    </AboutContainer>;
};

export default Board;
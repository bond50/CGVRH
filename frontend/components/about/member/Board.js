import React from 'react';
import AboutContainer from "../../reusables/AboutContainer";
import List from "../../reusables/List";
import Members from "./Members";


const Board = () => {
    const list = [
        {
            desc: 'The facility has :',
            content: [
                {name: 'A well Established , effective and efficient hospital management leadership and governance system.',},
                {name: 'Improved health governance system.',},
                {name: 'Improved stewardship on health management agenda.',},
                {name: 'Streamlined health partnership arrangements.',},
                {name: 'Enhanced stakeholder coordination and participation.',},
            ]
        },
    ]
    const intro = [
        {title: 'VCRH is run by the Hospital Management Team under the leadership of the Medical Superintendent and supervision by the Hospital Management Committee'},
        {title: `The Hospital Management Committee is appointed by the CEC Health under Act 235 (1) (b) Constitution of Kenya 2010 and Section 67 of the County Governments Act 2012; and represents the interests of the community.`},
        {title: `The medical superintendent reports to the County Health Management Team through the County Director of Health. The County Director of Health in turn reports to the Chief Officer of Health and gives technical advice to the County Executive Committee member of Health (who heads the Department of Health) and the County Governor.`}
    ]

    return <AboutContainer title='About Hospital Management Team'  id='team'>
        <List
            list={list}
            intro={intro}
        />
        <Members/>
    </AboutContainer>;
};

export default Board;
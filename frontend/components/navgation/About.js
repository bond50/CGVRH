import React from 'react';
import {aboutList} from "./dropdown-links";
import StaticDropdown from "./static-dropdown";
import MyLink from "./myLink";

const About = ({clicked}) => {


    function showMediaLinks() {
        return aboutList.map(m => {
            return <MyLink key={m._id} to={`/about-us/${m.slug}`} caption={m.title}
                           clicked={clicked}/>
        })
    }

    return (
        <StaticDropdown caption='about us'>
            {showMediaLinks()}
        </StaticDropdown>
    );
};

export default About;
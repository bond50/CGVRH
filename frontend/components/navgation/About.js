import React from 'react';
import {aboutList} from "./dropdown-links";
import StaticDropdown from "./static-dropdown";
import MyLink from "./myLink";

const About = () => {

    function showMediaLinks() {
        return aboutList.map(m => {
            return <MyLink key={m._id} to={`/about-us/${m.slug}`} caption={m.title}/>
        })
    }

    return (
        <StaticDropdown caption='about us'>
            {showMediaLinks()}
        </StaticDropdown>
    );
};

export default About;
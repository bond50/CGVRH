import React from 'react';
import {covidList} from "./dropdown-links";
import StaticDropdown from "./static-dropdown";
import MyLink from "./nav-link/myLink";

const Corona = ({clicked}) => {

    function showMediaLinks() {
        return covidList.map(m => {
            return <MyLink key={m._id} to={`/covid/${m.slug}`} caption={m.title} clicked={clicked}/>
        })
    }

    return (
        <StaticDropdown caption='covid 19'>
            {showMediaLinks()}
        </StaticDropdown>
    );
};

export default Corona;
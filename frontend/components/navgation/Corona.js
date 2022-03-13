import React from 'react';
import {covidList} from "./dropdown-links";
import StaticDropdown from "./static-dropdown";
import MyLink from "./myLink";

const Corona = () => {

    function showMediaLinks() {
        return covidList.map(m => {
            return <MyLink key={m._id} to={`/covid/${m.slug}`} caption={m.title}/>
        })
    }

    return (
        <StaticDropdown caption='covid 19'>
            {showMediaLinks()}
        </StaticDropdown>
    );
};

export default Corona;
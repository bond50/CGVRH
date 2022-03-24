import React from 'react';
import {mediaList} from "./dropdown-links";
import StaticDropdown from "./static-dropdown";
import MyLink from "./myLink";

const Media = ({clicked}) => {

    function showMediaLinks() {
        return mediaList.map(m => {
            return <MyLink key={m._id} to={`/media/${m.slug}`} caption={m.title} clicked={clicked}/>
        })
    }

    return (
        <StaticDropdown caption='media'>
            {showMediaLinks()}
        </StaticDropdown>
    );
};

export default Media;
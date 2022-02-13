import React from 'react';
import {mediaList} from "./dropdown-links";
import StaticDropdown from "./static-dropdown";
import MyLink from "./myLink";

const Media = () => {

    function showMediaLinks() {
        return mediaList.map(m => {
            return <MyLink key={m._id} to={`/media/${m.slug}`} caption={m.title}/>
        })
    }

    return (
        <StaticDropdown caption='media'>
            {showMediaLinks()}
        </StaticDropdown>
    );
};

export default Media;
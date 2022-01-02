import React from 'react';
import {tableRows} from "../../reusables/functions/table-rows";
import CardDetail from "./card-detail";

const PendingPosts = ({data}) => {
    if (!data) {
        return <div className='preloader'/>
    }

    return (
        <CardDetail title='Pending posts' spanText='Needs approval'>
            {tableRows(data)}
        </CardDetail>

    );
};

export default PendingPosts;
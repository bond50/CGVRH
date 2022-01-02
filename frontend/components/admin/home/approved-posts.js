import React from 'react';
import {tableRows} from "../../reusables/functions/table-rows";
import CardDetail from "./card-detail";

const ApprovedPosts = ({data}) => {
    if (!data) {
        return <div className='preloader'/>
    }

    return (
        <CardDetail title='All posts' spanText='Only Approved posts (does not include rejected ones)'>
            {tableRows(data)}
        </CardDetail>

    );
};

export default ApprovedPosts;
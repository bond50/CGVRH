import React from 'react';
import {tableRows} from "../../reusables/functions/table-rows";
import CardDetail from "./card-detail";

const RejectedPosts = ({data}) => {
    if (!data) {
        return <div className='preloader'/>
    }


    return (
        <CardDetail title='Rejected posts' spanText='Not approved but seen'>
            {tableRows(data)}
        </CardDetail>

    );
};

export default RejectedPosts;
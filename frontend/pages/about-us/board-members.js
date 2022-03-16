import Layout from "../../hoc/Layout";
import React from 'react'
import Board from "../../components/about/member/Board";
import useSWR from "swr";
import {API} from "../../config";
import Breadcrumbs from "../../components/reusables/Breadcrumbs";


const Index = () => {
    const {data: members, error} = useSWR(
        [
            `${API}/users-hmt`,
        ],
        {
            revalidateOnFocus: true,
        },
    );
    if (!members) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>something went wrong</p>
    }


    return (
        <Layout>
            <Breadcrumbs/>
            <Board members={members}/>
        </Layout>
    );
};

export default Index;

import React from 'react';
import Layout from "../../hoc/Layout";
import Breadcrumbs from "../../components/reusables/Breadcrumbs";
import Link from "next/link";
import useSWR from 'swr'
import {fetcher} from "../../components/reusables/functions/fetcher";
import {API} from "../../config";

const Index = () => {

    const {data, error} = useSWR(`${API}/general`, fetcher)
    if (!data) {
        return <div id='preloader'/>
    }
    if (error) {
        return <p>Something went wrong</p>
    }

    const showList = data && data.map(pg => {
        return <li key={pg._id}>
            <i className="bi bi-chevron-double-right"/>
            <Link href={`/general/${pg.slug}`}>
                <a>{pg.title}</a>
            </Link>
        </li>
    })

    return (
        <Layout>
            <Breadcrumbs/>
            <section>
                <div className="container page-intro">
                    <h4>Useful Page Links</h4>
                    <ul>
                        {showList}
                    </ul>
                </div>
            </section>
        </Layout>
    );
};

export default Index;
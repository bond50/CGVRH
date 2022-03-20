import React from 'react';
import Layout from "../../hoc/Layout";
import Breadcrumbs from "../../components/reusables/Breadcrumbs";
import Link from "next/link";
import {list} from "../../actions/general";


const Index = ({pages}) => {
    const showList = pages.map(pg => {
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


export const getServerSideProps = async () => {

    return list().then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                props: {
                    pages: data,
                },
            };
        }
    });

};


export default Index;
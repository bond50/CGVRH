import Layout from "../../../hoc/Layout";
import GeneralPageHeader from "../../../hoc/general-page-header";
import React from "react";
import Breadcrumbs from "../../../components/reusables/Breadcrumbs";
import useSWR from 'swr'
import {fetcher} from "../../../components/reusables/functions/fetcher";
import {API} from "../../../config";
import DownloadList from "../../../components/media/downloads/download-list";

const Downloads = () => {
    const {data: files, error} = useSWR(`${API}/get-downloads`, fetcher)
    console.log(files)

    if (error) return <div>failed to load</div>
    if (!files) return <div>loading...</div>

    if (files.length === 0) {
        return <Layout>
            <GeneralPageHeader title='Sorry nothing to show here'/>
        </Layout>
    }
    return (
        <Layout>
            <Breadcrumbs/>

            <DownloadList files={files}/>
        </Layout>
    );
};

export default Downloads;
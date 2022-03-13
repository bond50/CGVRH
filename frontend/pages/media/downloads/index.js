import Layout from "../../../hoc/Layout";
import DownloadList from "../../../components/media/downloads/download-list";
import {getDownloads} from "../../../actions/fileupload";
import GeneralPageHeader from "../../../hoc/general-page-header";
import React from "react";
import Breadcrumbs from "../../../components/reusables/Breadcrumbs";


const Downloads = ({files}) => {
    if (!files || files.length === 0) {
        return <Layout>
            <GeneralPageHeader title='Sorry nothing to show here'/>
        </Layout>

    } else {
        return (
            <Layout>
                <Breadcrumbs/>
                <DownloadList files={files}/>
            </Layout>
        );
    }
};


export const getServerSideProps = async () => {
    return getDownloads().then((data) => {
        console.log(data)
        if (data.error) {
            console.log(data.error);
        } else {
            console.log('err')
            return {
                props: {
                    files: data.files,
                },
            };
        }
    });
};
export default Downloads;
import Gallery from "../../../components/media/gallery/Gallery";
import Layout from "../../../hoc/Layout";
import useSWR from "swr";
import {API} from "../../../config";
import {fetcher} from "../../../components/reusables/functions/fetcher";
import React from "react";
import GeneralPageHeader from "../../../hoc/general-page-header";


const GalleryIndex = () => {
    const {data, error} = useSWR(
        [
            `${API}/get-gallery`,
        ],
        fetcher,
        {
            revalidateOnFocus: false,
        },
    );

    if (!data) {
        return <div className='preloader'/>
    }
    if (error) {
        return 'Failed to load images from cloudinary '
    }
    if (data.length <= 0) {
        return <Layout>
            <GeneralPageHeader title='Sorry nothing to show here'/>
        </Layout>
    }


    return (
        <Layout>
            <Gallery
                data={data}/>
        </Layout>
    );
};

export default GalleryIndex;
import React from 'react';
import GalleryWrapper from "../../../../components/media/gallery/gallery-wrapper";
import useSWR from "swr";
import {API} from "../../../../config";
import {fetcher} from "../../../../components/reusables/functions/fetcher";
import {useRouter} from "next/router";
import Layout from "../../../../hoc/Layout";


const Slug = () => {
    const router = useRouter()

    const {data, error} = useSWR(
        [
            `${API}/gallery-tag/${router.query.slug}`,
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


    return (
        <Layout>
            <GalleryWrapper data={data.data}/>
        </Layout>

    );
};

export default Slug;
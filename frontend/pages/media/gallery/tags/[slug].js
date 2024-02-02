import React from 'react';
import dynamic from "next/dynamic";
import useSWR from "swr";
import {API} from "../../../../config";
import {fetcher} from "../../../../components/reusables/functions/fetcher";
import {useRouter} from "next/router";
import Preloader from "../../../../components/preloader";

const GalleryWrapper = dynamic(() => import("../../../../components/media/gallery/gallery-wrapper"), {ssr: false});


const Layout = dynamic(() => import('../../../../hoc/Layout'), {loading: () => <Preloader/>, ssr: false})


const Slug = () => {
    const router = useRouter()


    const {data, error} = useSWR(
        [
            `${API}/gallery-data/${router.query.slug}`,
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
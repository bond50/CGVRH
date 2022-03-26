import React from 'react';
import BlogCarousel from "./blog-carousel";
import useSWR from "swr";
import {API} from "../../config";
import {fetcher} from "../reusables/functions/fetcher";

const BlogHero = () => {
    const {data, error} = useSWR(
        [
            `${API}/featured-blogs`,
        ],
        fetcher,
        {
            revalidateOnFocus: true,
        },
    );
    if (error) {
        return <div className='container p-5'>
            <div className='uh-oh'>failed to load blogs</div>
        </div>
    }

    if (!data) {
        return <div className='preloader'/>
    }


    return (
        data.length > 0 && <section id='hero' className='hero'>
            <BlogCarousel blogs={data}/>
        </section>
    );
};

export default BlogHero;
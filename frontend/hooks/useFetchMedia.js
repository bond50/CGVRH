import React, {useEffect, useState} from 'react';
import useSWR from "swr";
import {API} from "../config";
import {fetcher} from "../components/reusables/functions/fetcher";

const useFetchMedia = () => {
    const [tag, setTag] = useState('all')
    const [activeTag, setActiveTag] = useState('')
    const {data, error} = useSWR(
        [
            `${API}/get-gallery`,
        ],
        fetcher,
        {
            revalidateOnFocus: false,
        },
    );

    const [filteredImages, setFilteredImages] = useState([])

    const tagArr = ['all']
    data && data.map(img => {
        tagArr.push(img.tag)
    })

    const uniqueSet = new Set(tagArr)

    const transformedArray = [...uniqueSet]


    useEffect(() => {
        if (tag === 'all') {
            setFilteredImages(data)
            setActiveTag('all')
        } else {
            setFilteredImages(data.filter(image => image.tag === tag))
            setActiveTag(tag)
        }
    }, [tag])


    if (!data) {
        return <div className='preloader'/>
    }
    if (error) {
        return 'Failed to load images from cloudinary '
    }
    let source = data
    if (filteredImages) {
        source = filteredImages
    }

    return {transformedArray,source,setTag,activeTag}
};

export default useFetchMedia;
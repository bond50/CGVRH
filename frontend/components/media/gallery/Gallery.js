import {SRLWrapper} from "simple-react-lightbox";
import SimpleReactLightbox from 'simple-react-lightbox'
import classes from '../../../styles/Gallery.module.css'
import Image from "next/image";
import GeneralPageWrapper from "../../../hoc/general-page-wrapper";
import Filters from "./Filters";
import {useEffect, useState} from "react";
import useSWR from "swr";
import {API} from "../../../config";
import {fetcher} from "../../reusables/functions/fetcher";
import GalleryWrapper from "./gallery-wrapper";


const Gallery = ({data}) => {
    console.log(data)
    const [filteredImages, setFilteredImages] = useState([])
    const [activeTag, setActiveTag] = useState('')




    return (
        <GalleryWrapper data={data}/>
    );
}


export default Gallery

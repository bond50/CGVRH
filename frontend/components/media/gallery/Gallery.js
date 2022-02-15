import {useState} from "react";
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

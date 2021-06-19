
import  {useState, useEffect} from 'react';
import {getFilesFromCloud, getMultipleFilesFromCloud} from "../../../actions/gallery";
import Gallery from "../../../components/media/gallery/Gallery";
import Layout from "../../../hoc/Layout";




const GalleryIndex = ({images}) => {


    const [filteredImages, setFilteredImages] = useState([])
    const [tag, setTag] = useState('all')


    const tagArr = ['all']
    images && images.map(img => {
        tagArr.push(img.tag)
    })
    const uniqueSet = new Set(tagArr)
    const transformedArray = [...uniqueSet]


    useEffect(() => {
        if (tag === "all") {
            setFilteredImages(images)


        } else {
            setFilteredImages(images.filter(image => image.tag === tag))

        }


    }, [tag])


    return (
        <Layout>
            <Gallery images={filteredImages} handleTagClick={setTag} filters={transformedArray}/>
        </Layout>
    );
};


export const  getServerSideProps = async (context)=>{
    const  images = await getFilesFromCloud()
    return{
        props:{
            images
        }
    }
}

export default GalleryIndex;
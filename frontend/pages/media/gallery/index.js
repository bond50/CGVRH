import Gallery from "../../../components/media/gallery/Gallery";
import Layout from "../../../hoc/Layout";
import useFetchMedia from "../../../hooks/useFetchMedia";


const GalleryIndex = () => {
    const {transformedArray,source,setTag,activeTag} =useFetchMedia({folder:'gallery'})
    return (
        <Layout>
            <Gallery
                images={source}
                filters={transformedArray}
                handleTagClick={setTag}
                active={activeTag}/>

        </Layout>
    );
};

export default GalleryIndex;
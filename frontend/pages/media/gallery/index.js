import {useState, useEffect} from 'react';
import {getFilesFromCloud} from "../../../actions/gallery";
import Gallery from "../../../components/media/gallery/Gallery";
import Layout from "../../../hoc/Layout";


const GalleryIndex = () => {
    const [filteredImages, setFilteredImages] = useState([])
    const [tag, setTag] = useState('all')

    const [values, setValues] = useState({
        loading: false,
        error: '',
        images: []
    })

    const {images, loading, error} = values

    const tagArr = ['all']
    images && images.map(img => {
        tagArr.push(img.tag)
    })
    const uniqueSet = new Set(tagArr)
    const transformedArray = [...uniqueSet]


    const handleTag = () => {

        if (tag === "all") {
            setFilteredImages(images)
        } else {
            setFilteredImages(images.filter(image => image.tag === tag))
        }

    }

    const fetchImages = () => {
        setValues({...values, error: '', loading: true,})
        getFilesFromCloud().then(data => {
            if (data.error) {
                setValues({...values, error: 'Something went Wrong', loading: false,})

            } else {
                setValues({...values, loading: false, images: data})
            }
        })

    }

    useEffect(() => {
        fetchImages()
        setFilteredImages(images)
        handleTag()
    }, [tag, images.length])

    const showData = () => {
        let info

        if (loading) {
            info = <div className='container'>
                <div className="d-flex align-items-center m-4">
                    <strong>Loading...</strong>
                    <div className="spinner-grow ms-auto" role="status" aria-hidden="true"/>
                </div>
            </div>
        } else if (error) {
            info = 'Error '
        } else {
            info = <Gallery images={filteredImages} handleTagClick={setTag} filters={transformedArray}/>
        }
        return info

    }

    return (
        <Layout>
            {showData()}
        </Layout>
    );
};

export default GalleryIndex;
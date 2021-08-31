import {SRLWrapper} from "simple-react-lightbox";
import SimpleReactLightbox from 'simple-react-lightbox'
import classes from '../../../styles/Gallery.module.css'
import Image from "next/image";
import GeneralPageWrapper from "../../../hoc/general-page-wrapper";
import Filters from "./Filters";


const Gallery = ({images, filters, handleTagClick, active}) => {

    const options = {
        thumbnails: {
            showThumbnails: false
        },
        settings: {
            overlayColor: '#2092d0',
            autoplaySpeed: 3500,
            transitionSpeed: 1500
        },
        buttons: {
            backgroundColor: '#f2f03d',
            iconColor: '#824116'
        },
        caption: {
            captionColor: '#a6cfa5',
            captionFontWeight: '300',
            captionTextTransform: 'uppercase'
        },
        progressBar: {
            fillColor: '#ec7424',
            backgroundColor: 'white'
        }
    };

    return (
        <SimpleReactLightbox>
            <GeneralPageWrapper imgSrc='/fallback/services.jpg' title='Gallery' title2='Some images from our hospital'
                                alt='fallback image'>
                <Filters filters={filters} active={active} handleTagClick={handleTagClick}/>
                <div className='container'>

                    <SRLWrapper options={options}>
                        <div className='row g-0'>
                            {images && images.map(image => {
                                    return <div className="col-lg-3 col-md-4" key={image._id}>
                                        <div className={classes.GalleryItem}>
                                            <Image
                                                src={image.filePath}
                                                width={400}
                                                height={250}
                                                alt={`Tag: ${image.tag}`}
                                                className='img-fluid'/>
                                        </div>
                                    </div>;
                                }
                            )
                            }
                        </div>
                    </SRLWrapper>

                </div>
            </GeneralPageWrapper>
        </SimpleReactLightbox>
    );
}


export default Gallery

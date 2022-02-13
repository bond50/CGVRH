import React from 'react';
import SimpleReactLightbox, {SRLWrapper} from "simple-react-lightbox";
import Filters from "./Filters";
import classes from "../../../styles/Gallery.module.css";
import Image from "next/image";

const GalleryWrapper = ({data}) => {
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
            <Filters/>
            <div className='container'>
                <SRLWrapper options={options}>
                    <div className='row '>
                        {data && data.map(image => {
                                return <div className="col-lg-3 col-md-4" key={image._id}>
                                    <div className={classes.GalleryItem}>
                                        <Image
                                            src={image.filePath}
                                            width={800}
                                            height={500}
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
        </SimpleReactLightbox>
    );
};

export default GalleryWrapper;
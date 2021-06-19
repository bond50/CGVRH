import {SRLWrapper} from "simple-react-lightbox";


import Filters from "./Filters";

import classes from '../../../styles/Gallery.module.css'


const Gallery = ({images, handleTagClick, filters}) => {
    const options = {
        thumbnails: {
            showThumbnails: false
        },
        settings: {
            overlayColor: '#2092d0',
            autoplaySpeed: 3500,
            transitionSpeed: 900
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
        <section>
            <div className="row">
                <div className="col-lg-12 d-flex justify-content-center">
                    <Filters filters={filters} handleTagClick={handleTagClick}/>
                </div>
            </div>
            <div className='container'>
                <SRLWrapper options={options}>
                    <div className='row g-0'>
                        {images.length <= 0 ? <h1>Loading...</h1> :
                            images.map(image => <div className="col-lg-3 col-md-4">
                                    <div className={classes.GalleryItem}>
                                        <img src={image.secureUrl} alt={image.tag} className='img-fluid'/>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </SRLWrapper>
            </div>
        </section>
    );
}


export default Gallery
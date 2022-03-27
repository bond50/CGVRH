import React, {Fragment, useEffect, useState} from 'react';
import SimpleReactLightbox, {SRLWrapper} from "simple-react-lightbox";

import classes from "../../../styles/Gallery.module.css";
import Image from "next/image";
import axios from "axios";
import {API} from "../../../config";
import Filters from "../downloads/filters";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const GalleryWrapper = ({data}) => {

    const [images, setLoadedImages] = useState(data)
    const [buttons, setButtons] = useState([])
    const [active, setActive] = useState('10322d0vg2d0vgf&8buofd36eu447b4e')

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

    useEffect(() => {
        loadButtons()
    }, [])

    const loadButtons = () => {
        let myArr = [{_id: '10322d0vg2d0vgf&8buofd36eu447b4e', name: 'All'}]
        axios.get(`${API}/gallery-tags`)
            .then(res => {
                res.data.map(({_id, name}) => {
                    myArr.push({_id, name})
                })
                setButtons(myArr)
            })
    }

    function filterTags(id) {
        setActive(id)

        if (id === '10322d0vg2d0vgf&8buofd36eu447b4e') {
            setLoadedImages(data)
        } else {
            let filteredArr = data.filter((d) => {
                const tags = [d.tags];
                return tags.some(f => f.includes(id))

            });
            setLoadedImages(filteredArr)
        }


    }


    return (<Fragment>
            {/*<GeneralPageHeader*/}
            {/*    title='Gallery'>*/}
            {/*</GeneralPageHeader>*/}

            <SimpleReactLightbox>
                <section className={classes.Gallery}>
                    <Filters buttons={buttons}
                             handleTagFilter={filterTags}
                             active={active}/>
                    <div className='container-fluid'>

                        <div data-aos="slide-up" data-aos-delay="100">
                            <SRLWrapper options={options}>
                                <ResponsiveMasonry
                                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                                >
                                    <Masonry>
                                        {images.map(image => {
                                                return <div className={classes.GalleryItem} key={image._id}>

                                                    <Image
                                                        layout="responsive"
                                                        src={image.filePath}
                                                        width={image.width}
                                                        height={image.height}
                                                        alt={`Title: ${image.title}`}
                                                        className='img-fluid'/>

                                                </div>

                                            }
                                        )
                                        }
                                    </Masonry>

                                </ResponsiveMasonry>
                            </SRLWrapper>
                        </div>

                    </div>
                </section>
            </SimpleReactLightbox>
        </Fragment>

    );
};

export default GalleryWrapper;
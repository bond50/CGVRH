import React, {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination, Controller, Thumbs} from 'swiper';


SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

const images = [
    {name: 'jkuat', src: 'jkuat.jpg'},
    {name: 'kemri', src: 'kemri.png'},
]

const Partners = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [controlledSwiper, setControlledSwiper] = useState(null);

    const slides = images.map((img, i) => {
        return <div className="swiper-slide" key={i}>
            <img src={`/partners/${img.src}`} className="img-fluid" alt={img.name}/>
        </div>
    })


    return (
        // <section className="clients">
        //    <div className="swiper">
        //         <Swiper
        //         thumbs={{swiper: thumbsSwiper}}
        //         controller={{control: controlledSwiper}}
        //         navigation
        //         pagination
        //         spaceBetween={0}
        //         slidesPerView={1}
        //         onInit={(swiper) => console.log('Swiper initialized!', swiper)}
        //         onSlideChange={(swiper) => {
        //             console.log('Slide index changed to: ', swiper.activeIndex);
        //         }}
        //         onReachEnd={() => console.log('Swiper end reached')}
        //     >
        //         {slides}
        //     </Swiper>
        //    </div>
        //
        // </section>


        <section id="clients" className="clients">
            <div className="container" data-aos="zoom-in">

                <div className="clients-slider swiper-container">
                    <div className="swiper-wrapper align-items-center">
                        {slides}
                    </div>
                    <div className="swiper-pagination"></div>
                </div>

            </div>
        </section>
    )
}

export default Partners;
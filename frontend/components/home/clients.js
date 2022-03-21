import React from 'react';
import Image from "../reusables/lazy/Image";


const Clients = () => {


    const list = [
        {name: 'NHIF and community based organizations (CBOs).', src: '/partners/nhif1.png', width: 233, height: 217},
        {name: 'MOH', src: '/partners/moh1.png', width: 255, height: 206},
        {name: 'KEMRI/Welcome Trust', src: '/partners/kemri.png', width: 594, height: 256},
        {name: 'KMTC', src: '/partners/kmtc1.png', width: 255, height: 255},
        {name: 'Moi University', src: '/partners/mu.png', width: 170, height: 170},
        {name: 'Maseno University', src: '/partners/maseno.png', width: 152, height: 170},
    ]
    return (
        <section id="clients" className="clients section-bg">
            <div className="container">
                <div className="row" data-aos="zoom-in">
                    {list.map((item, i) => {
                        return <div
                            key={i}
                            className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
                            <Image
                                src={item.src}
                                height={item.height}
                                width={item.width}
                                className="img-fluid"
                                alt={item.name}
                                title={item.name}/>
                        </div>
                    })}
                </div>

            </div>
        </section>
    );
};

export default Clients;
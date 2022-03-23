import React from 'react';
import Image from "next/image";

const Clients = () => {

    const list = [

        {name: 'MOH', src: '/partners/moh1.png', width: 97, height: 82},
        {
            name: 'NHIF and community based organizations (CBOs).',
            src: '/partners/nhif1.png', width: 60, height: 60
        },
        {name: 'KEMRI/Welcome Trust', src: '/partners/kemri.png', width: 97, height: 42},
        {name: 'Kenya Medical Training Collage', src: '/partners/kmtc1.png', width: 97, height: 97},
        {
            name: 'Jomo Kenyatta University of Agriculture and Technology ',
            src: '/partners/jkuat1.png',
            width: 97,
            height: 97
        },
        {name: 'ICT Authority', src: '/partners/icta1.png', width: 97, height: 60},
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
                                width={97}
                                height={75}
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
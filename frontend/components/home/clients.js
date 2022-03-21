import React from 'react';
import Image from "next/image";

const Clients = () => {
    const list = [
        {
            name: 'NHIF and community based organizations (CBOs).',
            src: '/partners/nhif1.png',
        },
        {name: 'MOH', src: '/partners/moh1.png',},
        {name: 'KEMRI/Welcome Trust', src: '/partners/kemri.png',},
        {name: 'KMTC', src: '/partners/kmtc1.png',},
        {name: 'Moi University', src: '/partners/mu.png'},
        {name: 'Maseno University', src: '/partners/maseno.png'},
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
                                height={70}
                                width={70}
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
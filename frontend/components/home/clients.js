import React from 'react';
import Image from "next/image";

const Clients = () => {

    const list = [
        {
            name: 'NHIF and community based organizations (CBOs).',
            src: '/partners/nhif1.png', height: 84, width: 79,
        },
        {name: 'MOH', src: '/partners/moh1.png', height: 84, width: 79,},
        {name: 'KEMRI/Welcome Trust', src: '/partners/kemri.png', height: 48, width: 36,},
        {name: 'KMTC', src: '/partners/kmtc1.png', height: 84, width: 84,},
        {name: 'Moi University', src: '/partners/mu.png', height: 84, width: 84},
        {name: 'Maseno University', src: '/partners/maseno.png', height: 84, width: 94},
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
                                className="img-fluid"
                                width={item.width}
                                height={item.height}
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
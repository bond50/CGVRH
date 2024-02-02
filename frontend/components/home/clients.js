import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Clients = () => {

    const list = [

        {name: 'MOH', to: 'https://www.health.go.ke/', src: '/partners/moh1.png', width: 97, height: 82},
        {
            name: 'NHIF and community based organizations (CBOs).', to: 'https://www.nhif.or.ke/',
            src: '/partners/nhif1.png', width: 60, height: 60
        },
        {
            name: 'KEMRI/Welcome Trust',
            to: 'https://kemri-wellcome.org/',
            src: '/partners/kemri.png',
            width: 97,
            height: 42
        },
        {
            name: 'Kenya Medical Training Collage',
            to: 'https://kmtc.ac.ke/',
            src: '/partners/kmtc1.png',
            width: 97,
            height: 97
        },
        {
            name: 'Jomo Kenyatta University of Agriculture and Technology ', to: 'https://www.jkuat.ac.ke/',
            src: '/partners/jkuat1.png',
            width: 97,
            height: 97
        },
        {name: 'MAKL', to: 'https://makl.co.ke/', src: '/partners/makl.png', width: 97, height: 60},
    ]
    return (
        <section id="clients" className="clients">

            <div className="container-fluid" data-aos="fade-up">
                <div className="row">
                    {list.map((item, i) => {
                        return <div
                            key={i}
                            className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
                            <Link href={item.to}>
                                <Image
                                    src={item.src}
                                    width={97}
                                    height={75}
                                    className="img-fluid"
                                    alt={item.name}
                                    title={item.name}/>
                            </Link>
                        </div>
                    })}
                </div>

            </div>

        </section>
    );
};

export default Clients;
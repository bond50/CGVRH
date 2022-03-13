import React from 'react';
import Link from "next/link";
import Image from "next/image";

const Clients = () => {
    const list = [
        {name: 'NHIF and community based organizations (CBOs).', src: '/partners/nhif1.png',to:'http://www.nhif.or.ke/healthinsurance/'},
        {name: 'MOH', src: '/partners/moh1.png',to:'https://www.health.go.ke/'},
        {name: 'KEMRI/Welcome Trust', src: '/partners/kemri.png',to:'https://kemri-wellcome.org/'},
        {name: 'KMTC', src: '/partners/kmtc1.png',to:'https://kmtc.ac.ke/'},
        {name: 'Moi University', src: '/partners/mu.png',to:'https://www.mu.ac.ke/index.php/en/'},
        {name: 'Maseno University', src: '/partners/maseno.png',to:'https://www.maseno.ac.ke/',},
    ]
    return (
        <section id="clients" className="clients section-bg">
            <div className="container">
                <div className="row" data-aos="zoom-in">
                    {list.map((item, i) => {
                        return <div key={i}
                            className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
                            <Link href={item.to}>
                                 <img src={item.src} className="img-fluid" alt={item.name}/>
                            </Link>
                        </div>
                    })}


                </div>

            </div>
        </section>
    );
};

export default Clients;
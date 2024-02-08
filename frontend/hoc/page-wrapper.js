import Link from "next/link";
import React from "react";

import {Icon} from "@iconify/react";


const PageWrapper = ({related, children, title, project}) => {


    return (

        <section className='services-detail'>
            <div className="container " data-aos="fade-up" data-aos-delay="100">
                <div className="row">
                    <div className="col-lg-4 order-lg-1 order-2">
                        <div className="services-detail-items">
                            <h2>{title}</h2>
                            <div className="tags">
                                {related && related.map(pg => {
                                    return <Link href={project ? `/media/projects/${pg.slug}` : `/services/${pg.slug}`} key={pg._id}>
                                        <div className='tag'>
                                            <span>{pg.title}</span>
                                            <Icon icon="gg:chevron-double-right-o" className='icon'/>
                                        </div>
                                    </Link>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-8 order-lg-2 order-1'>
                        {children}
                    </div>
                </div>
            </div>
        </section>

    );
};

export default PageWrapper;
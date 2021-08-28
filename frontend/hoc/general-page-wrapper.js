import React, {Fragment} from 'react';
import Image from "next/image";
import classes from '../styles/general-page-wrapper.module.css'

const GeneralPageWrapper = ({imgSrc, alt, title, children,className}) => {
    const myLoader = () => {
        return imgSrc;
    }


    return (

        <Fragment>
            <div className="header-bg position-relative">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <Image
                                loader={myLoader}
                                src={imgSrc}
                                layout='fill'
                                objectFit='cover'
                                alt={alt}
                                objectPosition='center'

                            />
                            <div className="centered" style={{zIndex: '1'}}>
                                <div className="layer2 ">
                                    <h1>{title}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className={`section-bg ${className}`}>
                <div className="container">
                    <div className="section-title">
                        <h2>{title}</h2>
                    </div>
                       {children}

                </div>
            </section>
        </Fragment>

    );
};

export default GeneralPageWrapper;
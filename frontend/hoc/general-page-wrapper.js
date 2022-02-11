import React, {Fragment} from 'react';
import Image from "next/image";

const GeneralPageWrapper = ({title, children, className, title2}) => {

    return (
        <Fragment>
            <div className="header-bg position-relative">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
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
                    {title2 && <div className="section-title pb-3">
                        <h2>{title2}</h2>
                    </div>}
                    <div style={{padding: "60px 0"}}>
                        {children}
                    </div>
                </div>
            </section>
        </Fragment>

    );
};

export default GeneralPageWrapper;
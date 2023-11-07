import React, {Fragment} from 'react';

const GeneralPageHeader = ({title,sub}) => {

    return (
        <Fragment>
            <div className="header-bg position-relative">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="centered" style={{zIndex: '1'}}>

                                <div className="layer2 my-5">
                                    <h1>{title}</h1>
                                    <p className='text-white-50'>{sub}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>

    );
};

export default GeneralPageHeader;
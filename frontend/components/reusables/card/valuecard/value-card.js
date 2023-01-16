import React from 'react';

const ValueCard = ({paragraph, title, src}) => {
    return (
        <div className="card-item">
            <div className="row">
                <div className="col-xl-5">
                    <div className="card-bg"
                         style={{
                             backgroundImage:
                                 `url(${src})`
                         }}/>
                </div>
                <div className="col-xl-7 d-flex align-items-center">
                    <div className="card-body">
                        <h3 className="card-title">{title}</h3>
                        <p>{paragraph}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ValueCard;
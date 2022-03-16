import React from 'react';
import Image from "next/image";

const NextResponsiveCardedImage = () => {
    return (
        <div className="card" style={{width: "18rem"}}>
            <Image
                src="/assets/images/unsplash-1.jpeg"
                // just put the original width and height of the original image, in order to provide the right aspect ratio
                // Next.js will automatically reduce the size if the rendered image needs to be smaller.
                width={2400}
                height={1598}
                layout="responsive"
                className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the
                    cards content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    );
};

export default NextResponsiveCardedImage;
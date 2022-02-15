import React from 'react';
import Image from "next/image";

const NextResponsiveBackgroundImage = () => {
    return (
        <div>
            <div className="pt-2" style={{position: 'relative', width: '100vw', height: '66.66vw'}}>
                <Image
                    src="/assets/images/unsplash-1.jpeg"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        </div>
    );
};

export default NextResponsiveBackgroundImage;
// components/AdBanner.js
import React, {useEffect} from 'react';

const AdBanner = () => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{display: "block"}}
            data-ad-client="ca-pub-9278372397525835"
            data-ad-slot="1029838889"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    );
};

export default AdBanner;

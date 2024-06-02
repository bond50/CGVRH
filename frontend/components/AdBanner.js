// components/AdBanner.js
import {useEffect} from 'react';
import {ADSENSE_CLIENT_ID} from "../config";



const AdBanner = (props) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle adbanner-customize"
            style={{
                display: 'block',
                overflow: 'hidden',
            }}
            data-ad-client={ADSENSE_CLIENT_ID}
            {...props}
        />
    );
};

export default AdBanner;

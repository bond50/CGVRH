// components/AdBanner.js
import { useEffect } from 'react';

const AdBanner = (props) => {
    useEffect(() => {
        // Function to load the AdSense script dynamically
        const loadAdsenseScript = () => {
            const script = document.createElement('script');
            script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9278372397525835";
            script.async = true;
            script.crossOrigin = "anonymous";
            document.head.appendChild(script);
        };

        // Check if the environment is production
        if (process.env.NODE_ENV === 'production') {
            // Load AdSense script if not already loaded
            if (!window.adsbygoogle) {
                loadAdsenseScript();
            }

            try {
                // Ensure window.adsbygoogle exists before pushing
                if (typeof window !== 'undefined' && window.adsbygoogle) {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            } catch (err) {
                console.log(err);
            }
        }
    }, []);

    // Render nothing if not in production
    if (process.env.NODE_ENV !== 'production') {
        return null;
    }

    return (
        <ins
            className="adsbygoogle"
            style={{
                display: 'block',
                overflow: 'hidden',
            }}
            data-ad-client="ca-pub-9278372397525835"
            data-ad-slot="1029838889"
            data-ad-format="auto"
            data-full-width-responsive="true"
            {...props}
        />
    );
};

export default AdBanner;

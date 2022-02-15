import NextImage from 'next/image';
import {useEffect, useState} from 'react';

const Image = (props) => {
    const [loading, setLoading] = useState(props.loading);

    useEffect(() => {
        // Skip if image is already eager or has priority (disables lazy loading)
        if (props.loading === 'eager' || props.priority) {
            return;
        }

        if (!isMobileConnection()) {
            let clearDefer;
            // Set loading to eager if all resources of document are loaded, but defer it a bit
            const onLoad = () => {
                clearDefer = defer(() => setLoading('eager'));
            };
            window.addEventListener('load', onLoad);
            return () => {
                // Clean up the load event listener and an eventual defer
                window.removeEventListener('load', onLoad);
                if (clearDefer) {
                    clearDefer();
                }
            };
        }
    }, [props.loading, props.priority]);

    return <NextImage loading={loading} {...props} />;
};

const isMobileConnection = () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return (
        connection?.type === 'cellular' ||
        connection?.effectiveType === 'slow-2g' ||
        connection?.effectiveType === '2g' ||
        connection?.effectiveType === '3g' ||
        connection?.effectiveType === '4g' ||
        connection?.saveData === true
    );
};

const defer = (callback) => {
    // Check if we can use requestIdleCallback
    if (window.requestIdleCallback) {
        const handle = window.requestIdleCallback(callback);
        return () => window.cancelIdleCallback(handle);
    }
    // Just defer using setTimeout with some random delay otherwise
    const handle = setTimeout(callback, 2345 + Math.random() * 1000);
    return () => clearTimeout(handle);
};

export default Image;


// In a nutshell the new component does the following:
//
// Set up a state for loading which defaults to the passed loading prop
// Add an effect that depends on the props loading and priority (which implies eager if set)
// The effect will check if we have a mobile connection using the NetworkInformation API
// If we do not have a mobile connection, it will add an event listener for the load event
// In onLoad the actual change of the state is deferred, so that the image is not changed immediately, but when the browser is idle
// The effect finally cleans up the event listener and the defer handle
// This Image component can be used as a drop-in replacement for the next/image component just by changing the import:
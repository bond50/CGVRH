import {useEffect, useCallback} from 'react';

const useEventListener = (eventName, eventHandler = () => null, element = window) => {
    useEffect(
        () => {
            // Check if the element supports the addEventListener method
            const checked = element && element.addEventListener;
            // Stop here if not supported
            if (!checked) return;
            // Add event listener
            element.addEventListener(eventName, handleEventHandler);
            // Remove event listener on cleanup
            return () => {
                element.removeEventListener(eventName, handleEventHandler);
            };
        },
        [eventName, element, handleEventHandler] // Re-run if eventName, element, or eventHandler changes
    );

    const handleEventHandler = useCallback(
        event => {
            if (typeof eventHandler === "function") {
                eventHandler(event);
            }
        },
        [eventHandler]
    );

};

export default useEventListener;
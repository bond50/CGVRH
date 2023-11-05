import React from 'react';

const Button = ({btnCapture, loading, clicked, variant, type, images, customClass, fieldsToCheck}) => {
    let disableBtn = loading;

    // Check if any of the fields in fieldsToCheck are empty or null
    if (fieldsToCheck) {
        for (const field of fieldsToCheck) {
            if (!field) {
                disableBtn = true;
                break; // Disable the button and exit the loop
            }
        }
    }

    // Check if images is an array and has at least one item
    if (images && Array.isArray(images) && images.length < 1) {
        disableBtn = true;
    }

    return (
        <button
            className={`btn btn-${variant} ${customClass} ${disableBtn ? 'disabled-button' : ''}`}
            type={type}
            disabled={disableBtn}
            onClick={clicked}>
            {btnCapture}
        </button>

    );
};

Button.defaultProps = {
    btnCapture: 'Loading...',
    variant: 'primary',
    type: 'button',
};

export default Button;

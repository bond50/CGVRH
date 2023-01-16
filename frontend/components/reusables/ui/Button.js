import React from 'react';

const Button = ({btnCapture, loading, clicked, variant, type, images, customClass}) => {
    let disableBtn = loading

    if (images ) {
        disableBtn = loading || images.length < 1
    }


    return (
        <button
            className={`btn btn-${variant} ${customClass}`}
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
    type: 'button'
}

export default Button;
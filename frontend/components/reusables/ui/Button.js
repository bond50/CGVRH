import React from 'react';

const Button = ({btnCapture, loading, clicked, variant, type, customClass}) => (
    <button
        className={`btn btn-${variant} ${customClass}`}
        type={type}
        disabled={loading}
        onClick={clicked}>
        {btnCapture}
    </button>
);
Button.defaultProps = {
    btnCapture: 'Loading...',
    variant: 'primary',
    type: 'button'
}

export default Button;
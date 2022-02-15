import React from "react";


const SwitchBox = ({title, clicked}) => {
    return (
        <div className="form-check form-switch">
            <input
                className="form-check-input"
                type="checkbox"
                checked={false}
                onClick={clicked}
                id="flexSwitchCheckDefault"/>
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{title}</label>
        </div>
    );
};

export default SwitchBox;
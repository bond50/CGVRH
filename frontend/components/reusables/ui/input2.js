import React from 'react';

const Input2 = ({handleChange, value, name, type}) => {
    return (
        <div className="col-12">
            <label htmlFor="name" className="form-label">Your Name</label>
            <div className="input-group ">
                <input
                    value={value}
                    onChange={handleChange}
                    type={type}
                    name={name}
                    className="form-control"
                />
            </div>
        </div>
    );
};

export default Input2;
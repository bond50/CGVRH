import React from 'react';
import Alert from "../../messages/Alert";
import Button from "../ui/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UploadTenderForm = ({
                              values,
                              openDate,
                              closeDate,
                              handleChange,
                              handleOpenDateChange,
                              handleCloseDateChange,
                              handleSingleFile,
                              loading,
                              selectedFile,
                              handleSubmit
                          }) => {
    let btnText = 'Save';
    if (loading) {
        btnText = (
            <>
                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/> Saving...
            </>
        );
    }

    return (
        <form onSubmit={handleSubmit}>

            <div className="input-group mb-3">
                <input
                    value={values.title}
                    name='title'
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Title"
                />
            </div>
            <div className="input-group mb-3">
                <input
                    value={values.tenderNumber}
                    onChange={handleChange}
                    type="text"
                    name='tenderNumber'
                    className="form-control"
                    placeholder="Tender Number"
                />
            </div>
            <div className="form-group mb-3"> {/* Use form-group for date pickers */}
                <DatePicker
                    selected={openDate}
                    onChange={handleOpenDateChange}
                    className="form-control"
                    showTimeSelect
                    dateFormat="Pp"
                    placeholderText="Select Open Date and time"
                />
            </div>
            <div className="form-group mb-3"> {/* Use form-group for date pickers */}
                <DatePicker
                    selected={closeDate}
                    onChange={handleCloseDateChange}
                    className="form-control"
                    showTimeSelect
                    dateFormat="Pp"
                    placeholderText="Select Closing Date and time"
                />
            </div>
            <div className="input-group mb-3">
                <input
                    className="form-control"
                    onChange={handleSingleFile}
                    type="file"
                    accept="application/pdf"
                />
            </div>
            {selectedFile && <p>Selected File: {selectedFile.name}</p>}
            <div className='mb-3'>
                {loading && <Alert
                    msg='Please be patient as we process your request.The process might take a while depending on your internet connection speed'
                    label='Info' type='info'/>}
                {values.successMessage && <Alert msg={values.successMessage} type="success" label="Success"/>}
                {values.error && <Alert msg={values.error} type="danger" label="Danger" reload/>}
            </div>
            <Button
                type='submit'
                btnCapture={btnText}
                loading={loading}
                fieldsToCheck={[values.title, values.tenderNumber, openDate, closeDate, selectedFile]}
            />

        </form>
    );
};

export default UploadTenderForm;

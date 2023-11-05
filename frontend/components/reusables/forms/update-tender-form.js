import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Link from "next/link";
import Button from "../ui/Button";
import Alert from "../../messages/Alert";

const UpdateTenderForm = ({
                              values,
                              openDate,
                              closeDate,
                              handleChange,
                              handleOpenDateChange,
                              handleCloseDateChange,
                              selectedFile,
                              loadedFile,
                              handleFileChange,
                              isArchived,
                              isAwarded,
                              isHidden,
                              isClosed,
                              isOpen,
                              loading,
                              handleSubmit,
                              handleAwardedToggle,
                              handleOpenToggle,
                              handleArchivedToggle,
                              handleHiddenToggle,
                              handleCloseToggle,
                              successMessage,
                              error
                          }) => {

    let btnText = 'Update';
    if (loading) {
        btnText = (
            <>
                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/> Saving...
            </>
        );
    }


    return (
        <div className='card'>

            <div className="card-body">
                <h5 className="card-title mb-5">Update <span>| {values.tenderNumber}</span></h5>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isOpen}
                        onChange={handleOpenToggle}
                        id="isOpen"
                    />
                    <label className="form-check-label" htmlFor="isOpen">Mark as Open</label>
                </div>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isClosed}
                        onChange={handleCloseToggle}
                        id="isClosed"
                    />
                    <label className="form-check-label" htmlFor="isClosed">Close Tender</label>
                </div>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isArchived}
                        onChange={handleArchivedToggle}
                        id="isArchived"
                    />
                    <label className="form-check-label" htmlFor="isArchived">Mark as Archived</label>
                </div>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isHidden}
                        onChange={handleHiddenToggle}
                        id="isHidden"
                    />
                    <label className="form-check-label" htmlFor="isHidden">Hide Tender</label>
                </div>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isAwarded}
                        onChange={handleAwardedToggle}
                        id="isAwarded"
                    />
                    <label className="form-check-label" htmlFor="isAwarded">Mark as Awarded</label>
                </div>
            </div>


            <div className="card-body">


                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label className="text-muted">Title</label>
                        <input
                            value={values.title}
                            name='title'
                            onChange={handleChange}
                            type='text'
                            className='form-control'
                            placeholder='Title'
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="text-muted">Tender Number</label>
                        <input
                            value={values.tenderNumber}
                            onChange={handleChange}
                            type='text'
                            name='tenderNumber'
                            className='form-control'
                            placeholder='Tender Number'
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="text-muted">Open date</label>
                        <DatePicker
                            selected={openDate}
                            onChange={handleOpenDateChange}
                            className='form-control'
                            showTimeSelect
                            dateFormat="Pp"

                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="text-muted">Close date</label>
                        <DatePicker
                            selected={closeDate}
                            onChange={handleCloseDateChange}
                            className='form-control'
                            showTimeSelect
                            dateFormat="Pp"
                        />
                    </div>

                    <div className='form-group mb-3 text-black-50 fst-italic'>
                        {selectedFile && <p className={''}>New Selected File: {selectedFile.name}</p>}
                        {values.fileName && !selectedFile && <p>Previously Selected File: {values.fileName}</p>}

                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        {loadedFile && (
                            <div>
                                <Link href={loadedFile}>
                                    <a className="btn btn-outline-primary">View previously uploaded pdf</a>
                                </Link>
                            </div>
                        )}

                        <div>
                            <input
                                id="pdfInput"
                                className="form-control"
                                type="file"
                                hidden
                                accept="application/pdf"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="pdfInput" className="btn btn-secondary">
                                Change uploaded PDF
                            </label>
                        </div>
                    </div>

                    <div className='mb-3'>
                        {loading && <Alert
                            msg='Please be patient as we process your request.The process might take a while depending on your internet connection speed'
                            label='Info' type='info'/>}

                        {successMessage && <Alert msg={successMessage} type="success" label="Success"/>}
                        {error && <Alert msg={error} type="danger" label="Danger" reload/>}
                    </div>

                    <div className="d-grid">
                        <button
                            disabled={loading}
                            className="btn btn-primary"
                            type="submit">{btnText}
                        </button>

                    </div>

                </form>
            </div>


        </div>
    );
};

export default UpdateTenderForm;

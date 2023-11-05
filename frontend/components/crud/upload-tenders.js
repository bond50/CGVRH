import React, {useState} from 'react';
import UploadTenderForm from "../../components/reusables/forms/upload-tender-form";
import axiosInstance from "../../axios/axios";
import {API} from "../../config";

const UploadFiles = () => {
    const [values, setValues] = useState({
        tenderNumber: '',
        title: '',
        successMessage: '',
        error: '',

    });
    const [openDate, setOpenDate] = useState(null); // Initialize as null
    const [closeDate, setCloseDate] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setValues({
            ...values,
            error: "",
            [name]: value
        });
    };

    const handleOpenDateChange = (date) => {
        // Handle changes to the 'openDate' field
        setOpenDate(date);
    };

    const handleCloseDateChange = (date) => {
        // Handle changes to the 'closeDate' field
        setCloseDate(date);
    };

    const handleSingleFile = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Format the dates as strings
        const formattedOpenDate = openDate.toISOString();
        const formattedCloseDate = closeDate.toISOString();

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('tenderNumber', values.tenderNumber);
            formData.append('folder', 'Tenders');
            formData.append('file', selectedFile);
            formData.append('openDate', formattedOpenDate);
            formData.append('closeDate', formattedCloseDate);

            const response = await axiosInstance.post(`${API}/tender-create`, formData);

            if (response.data.success) {
                setValues({
                    tenderNumber: '',
                    title: '',
                    successMessage: response.data.successMessage,
                    error: '',
                });
                setSelectedFile(null); // Clear the selected file
                setOpenDate(null); // Clear openDate
                setCloseDate(null); // Clear closeDate
                setLoading(false);

            } else {
                setValues({
                    ...values,
                    error: response.data.error,
                    successMessage: '',
                });
                setLoading(false);
            }

        } catch (error) {
            if (error.response) {
                setValues({
                    ...values,
                    error: error.response.data.error,
                    successMessage: '',
                });
            } else {
                setValues({
                    ...values,
                    error: 'An error occurred while uploading the tender.',
                    successMessage: '',
                });
            }
            setLoading(false);
        }
    };


    return (
        <div className="container-fluid m-5">
            <div className="row">
                <div className="col-md-8">
                    <UploadTenderForm
                        values={values}
                        openDate={openDate}
                        closeDate={closeDate}
                        selectedFile={selectedFile}
                        handleChange={handleChange}
                        handleOpenDateChange={handleOpenDateChange}
                        handleCloseDateChange={handleCloseDateChange}
                        handleSingleFile={handleSingleFile}
                        loading={loading}
                        handleSubmit={handleSubmit}

                    />
                </div>
            </div>
        </div>
    );
};

export default UploadFiles;

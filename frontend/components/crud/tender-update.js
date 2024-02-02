import React, {useEffect, useState} from 'react';
import Router, {useRouter} from 'next/router';
import {fetchSingleTender, updateTender} from '../../actions/tender';
import UpdateTenderForm from '../reusables/forms/update-tender-form';

const TenderUpdate = () => {

    const router = useRouter();
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [openDate, setOpenDate] = useState(null);
    const [closeDate, setCloseDate] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loadedFile, setLoadedFile] = useState(null);
    const [isHidden, setIsHidden] = useState(false); // switch
    const [isOpen, setIsOpen] = useState(false); // switch
    const [isArchived, setIsArchived] = useState(false); // switch
    const [isAwarded, setIsAwarded] = useState(false); // switch
    const [isClosed, setIsClosed] = useState(false); // switch
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')



    const {_id: tenderId} = router.query;

    useEffect(() => {

        if (tenderId) {
            setLoading(true);
            fetchSingleTender(tenderId)
                .then((data) => {
                    setCloseDate(new Date(data.closeDate));
                    setLoadedFile(data.filePath);
                    setOpenDate(new Date(data.openDate));
                    setIsArchived(data.isArchived)
                    setIsHidden(data.isHidden)
                    setIsAwarded(data.isAwarded)
                    setIsClosed(data.isClosed)
                    setIsOpen(data.isOpen)
                    setLoading(false);
                    setValues(data)
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [router.query]);



    const handleOpenDateChange = (date) => {
        setOpenDate(date);
    };

    const handleCloseDateChange = (date) => {
        setCloseDate(date);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = (e) => {
       if (e){
            e.preventDefault();
       }
        const formattedOpenDate = openDate.toISOString(); // Convert to ISO string
        const formattedCloseDate = closeDate.toISOString();

        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('tenderNumber', values.tenderNumber);
        formData.append('folder', 'Tenders');
        formData.append('file', selectedFile);
        formData.append('openDate', formattedOpenDate);
        formData.append('closeDate', formattedCloseDate);
        formData.append('isHidden', isHidden);
        formData.append('isOpen', isOpen);
        formData.append('isAwarded', isAwarded);
        formData.append('isArchived', isArchived);
        formData.append('isClosed', isClosed);
        setLoading(true);
        updateTender(tenderId, formData)
            .then((response) => {
                console.log(response)
                if (response.success) {
                    setSuccessMessage(response.successMessage);
                    setError('');
                    setLoading(false);
                    Router.replace(`/admin2/crud/tenders`).then(r => console.log(r));
                } else {
                    setSuccessMessage('');
                    setError(response.data.error);
                    setLoading(false);
                }
            })
            .catch((error) => {
                if (error.response) {
                    setSuccessMessage('');
                    setError(error.response.data.error);

                } else {
                    setSuccessMessage('');
                    setError('An error occurred while uploading the tender.')

                }
                setLoading(false);
            });


    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setError('')
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleHiddenToggle = () => {
        setIsHidden(true);
        setIsOpen(false);
        setIsArchived(false);
        setIsAwarded(false);
        setIsClosed(false);
    };

    const handleOpenToggle = () => {
        setIsHidden(false);
        setIsOpen(true);
        setIsArchived(false);
        setIsAwarded(false);
        setIsClosed(false);
    };
    const handleCloseToggle = () => {
        setIsHidden(false);
        setIsOpen(false);
        setIsArchived(false);
        setIsAwarded(false);
        setIsClosed(true);
    };

    const handleArchivedToggle = () => {
        setIsHidden(false);
        setIsOpen(false);
        setIsArchived(true);
        setIsAwarded(false);
        setIsClosed(false);
    };

    const handleAwardedToggle = () => {
        setIsHidden(false);
        setIsOpen(false);
        setIsArchived(false);
        setIsAwarded(true);
        setIsClosed(false)
    };


    return (
        <div className="container-fluid m-5">
            <div className="row">
                <div className="col-md-8">
                    <UpdateTenderForm
                        values={values}
                        closeDate={closeDate}
                        handleCloseDateChange={handleCloseDateChange}
                        handleOpenDateChange={handleOpenDateChange}
                        handleFileChange={handleFileChange}
                        handleSubmit={handleSubmit}
                        openDate={openDate}
                        handleChange={handleChange}
                        selectedFile={selectedFile}
                        loadedFile={loadedFile}
                        loading={loading}
                        isHidden={isHidden}
                        isOpen={isOpen}
                        isArchived={isArchived}
                        isAwarded={isAwarded}
                        isClosed={isClosed}
                        handleCloseToggle={handleCloseToggle}
                        handleAwardedToggle={handleAwardedToggle}
                        handleOpenToggle={handleOpenToggle}
                        handleArchivedToggle={handleArchivedToggle}
                        handleHiddenToggle={handleHiddenToggle}
                        error={error}
                        successMessage={successMessage}

                    />
                </div>
            </div>
        </div>
    );
};

export default TenderUpdate;

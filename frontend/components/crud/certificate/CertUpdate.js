import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import {getCookie, isAuth} from '../../../actions/auth';
import {API} from '../../../config';
import Alert from '../../messages/Alert';

const UpdateCertificate = () => {
    const [values, setValues] = useState({
        projectTitle: "",
        projectManager: "",
        contractor: "",
        tenderId: "",
        partOfWorks: "",
        wholeOfWorks: "",
        plannedCompletionDate: "",
        actualCompletionDate: "",
        defectsDate: "",
        defectsText: "",
        facilityIncharge: "",
        projectSupervisor: "",
        completionPercentage: 0,
        facilityName: "",
        amount: 0,
        error: "",
        success: "",
    });

    const {
        projectTitle,
        contractor,
        projectManager,
        tenderId,
        partOfWorks,
        wholeOfWorks,
        plannedCompletionDate,
        actualCompletionDate,
        defectsDate,
        defectsText,
        facilityIncharge,
        projectSupervisor,
        facilityName,
        completionPercentage,
        amount,
        error,
        success
    } = values;

    const token = getCookie("token");
    const router = useRouter();

    let updateCertificateEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updateCertificateEndpoint = `${API}/certificate/${router.query._id}`;
    } else if (isAuth() && isAuth().role === 0) {
        updateCertificateEndpoint = `${API}/user/certificate/${router.query._id}`;
    }


    useEffect(() => {
        if (router.query._id) {
            initCertificate(router.query.id);
        }
    }, [router.query.id]);

    const initCertificate = () => {
        axios.get(updateCertificateEndpoint)
            .then((res) => {
                const certificate = res.data;

                setValues({
                    ...values,
                    projectTitle: certificate.projectTitle,
                    contractor: certificate.contractor,
                    projectManager: certificate.projectManager,
                    tenderId: certificate.tenderId,
                    partOfWorks: certificate.partOfWorks,
                    wholeOfWorks: certificate.wholeOfWorks,
                    completionPercentage: certificate.completionPercentage,
                    defectsText: certificate.defectsText,
                    facilityIncharge: certificate.facilityIncharge,
                    projectSupervisor: certificate.projectSupervisor,
                    facilityName: certificate.facilityName,
                    plannedCompletionDate: certificate.plannedCompletionDate ? new Date(certificate.plannedCompletionDate).toISOString().split('T')[0] : "",
                    actualCompletionDate: certificate.actualCompletionDate ? new Date(certificate.actualCompletionDate).toISOString().split('T')[0] : "",
                    defectsDate: certificate.defectsDate ? new Date(certificate.defectsDate).toISOString().split('T')[0] : "",
                    amount: certificate.amount,
                });
            })
            .catch((error) => {
                const errorMsg = error.response?.data?.error || "An error occurred.";
                setValues({...values, error: errorMsg});
            });
    };


    const handleChange = (name) => (e) => {
        setValues({...values, [name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const config = {
            headers: {Authorization: `Bearer ${token}`},
        };

        const bodyParameters = {
            projectTitle,
            projectManager,
            contractor,
            tenderId,
            partOfWorks,
            wholeOfWorks,
            plannedCompletionDate,
            actualCompletionDate,
            defectsDate,
            defectsText,
            facilityIncharge,
            projectSupervisor,
            completionPercentage,
            facilityName,
            amount
        };

        axios.put(updateCertificateEndpoint, bodyParameters, config)
            .then((res) => {
                setValues({
                    ...values,
                    success: `Certificate titled "${res.data.projectTitle}" has been updated.`,
                    error: "",
                });
            })
            .catch((error) => {
                const errorMsg = error.response?.data?.error || "An error occurred.";
                setValues({...values, error: errorMsg});
            });
    };

    return (
        <div className="row">
            <div className="col-md-8">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor=" facilityName">Facility Name</label>
                        <input
                            type="text"
                            id=" facilityName"
                            className="form-control"
                            value={facilityName}
                            onChange={handleChange(" facilityName")}
                            required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="facilityIncharge">Facility Incharge</label>
                        <input
                            type="text"
                            id="facilityIncharge"
                            className="form-control"
                            value={facilityIncharge}
                            onChange={handleChange("facilityIncharge")}
                            required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="projectSupervisor">Project Supervisor</label>
                        <input
                            type="text"
                            id="projectSupervisor"
                            className="form-control"
                            value={projectSupervisor}
                            onChange={handleChange("projectSupervisor")}
                            required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="projectTitle">Project Title</label>
                        <input
                            type="text"
                            id="projectTitle"
                            className="form-control"
                            value={projectTitle}
                            onChange={handleChange("projectTitle")}
                            required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="projectManager">Project Manager</label>
                        <input
                            type="text"
                            id="projectManager"
                            className="form-control"
                            value={projectManager}
                            onChange={handleChange("projectManager")}
                            required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="contractor">Contractor</label>
                        <input
                            type="text"
                            id="contractor"
                            className="form-control"
                            value={contractor}
                            onChange={handleChange("contractor")}
                            required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tenderId">Tender ID</label>
                        <input
                            type="text"
                            id="tenderId"
                            className="form-control"
                            value={tenderId}
                            onChange={handleChange("tenderId")}
                            required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="partOfWorks">Part of Works</label>
                        <textarea
                            id="partOfWorks"
                            className="form-control"
                            value={partOfWorks}
                            onChange={handleChange("partOfWorks")}
                            required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="wholeOfWorks">Whole of Works</label>
                        <textarea
                            id="wholeOfWorks"
                            className="form-control"
                            value={wholeOfWorks}
                            onChange={handleChange("wholeOfWorks")}
                            required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="plannedCompletionDate">Planned Completion Date</label>
                        <input
                            type="date"
                            id="plannedCompletionDate"
                            className="form-control"
                            value={plannedCompletionDate}
                            onChange={(handleChange("plannedCompletionDate"))}
                            required/>
                    </div>


                    <div className="form-group">
                        <label htmlFor="actualCompletionDate">Actual Completion Date</label>
                        <input
                            type="date"
                            id="actualCompletionDate"
                            className="form-control"
                            value={actualCompletionDate}
                            onChange={(handleChange("actualCompletionDate"))}
                            required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="completionPercentage">Completion Percentage (Do not
                            include <strong> %</strong> here)</label>
                        <input
                            type="number"
                            id="completionPercentage"
                            className="form-control"
                            value={completionPercentage}
                            onChange={handleChange("completionPercentage")}
                            required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="defectsDate">Defects Date</label>
                        <input
                            type="date"
                            id="defectsDate"
                            className="form-control"
                            value={defectsDate}
                            onChange={(handleChange("defectsDate"))}
                            required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="defectsText">Defects Text</label>
                        <textarea
                            id="defectsText"
                            className="form-control"
                            value={defectsText}
                            onChange={handleChange("defectsText")}
                            required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            className="form-control"
                            value={amount}
                            onChange={(handleChange("amount"))}
                            required/>
                    </div>

                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary">Update Certificate</button>
                    </div>
                </form>
                <div className="mb-3">
                    <Alert msg={error} type="danger" label="Error"/>
                    <Alert msg={success} type="success" label="Success"/>
                </div>
            </div>
        </div>
    );
};

export default UpdateCertificate;
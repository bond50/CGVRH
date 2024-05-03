// components/CreateCertificate.js
import React, {useState} from "react";
import axios from "axios";
import {getCookie, isAuth} from "../../../actions/auth";
import {API} from "../../../config";
import Alert from "../../messages/Alert";

const CreateCertificate = () => {
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
        amount: 0,
        completionPercentage: 0,
        error: "",
        success: "",
        defectsText: "",
        facilityIncharge: "",
        projectSupervisor: ""
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
        completionPercentage,
        amount,
        error,
        success
    } = values;

    let certificateEndpoint;

    if (isAuth() && isAuth().role === 1) {
        certificateEndpoint = `${API}/certificate`;
    } else if (isAuth() && isAuth().role === 0) {
        certificateEndpoint = `${API}/user/certificate`;
    }

    const token = getCookie("token");

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
            defectsText,
            facilityIncharge,
            projectSupervisor,
            completionPercentage,
            plannedCompletionDate,
            actualCompletionDate,
            defectsDate,
            amount
        };

        axios.post(certificateEndpoint, bodyParameters, config)
            .then((res) => {
                console.log(res.data)
                setValues({
                    ...values,
                    projectTitle: "",
                    contractor: "",
                    projectManager: "",
                    tenderId: "",
                    partOfWorks: "",
                    wholeOfWorks: "",
                    plannedCompletionDate: "",
                    actualCompletionDate: "",
                    defectsDate: "",
                    defectsText: "",
                    facilityIncharge: "",
                   completionPercentage: "",
                    projectSupervisor: "",
                    amount: 0,
                    success: `A new certificate titled "${res.data.projectTitle}" is created`,
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
                        <label htmlFor="projectTitle">Project Manager</label>
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
                            onChange={handleChange("plannedCompletionDate")} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="actualCompletionDate">Actual Completion Date</label>
                        <input
                            type="date"
                            id="actualCompletionDate"
                            className="form-control"
                            value={actualCompletionDate}
                            onChange={handleChange("actualCompletionDate")}
                            required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="completionPercentage">Completion Percentage</label>
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
                            onChange={handleChange("defectsDate")}
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
                            value={amount} onChange={handleChange("amount")}
                            required/>
                    </div>

                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary">Create Certificate</button>

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

export default CreateCertificate;

import React, {Component, useEffect, useState} from 'react'
import Select from 'react-select'
import axios from 'axios'
import {

    designation,
    disability,
    employeeStatuses,
    ethnicity,
    positionStatusList,
    maritalStatus,
    facilityOptions,
    titles,
    facilityCodes,
    positionChangeReason,
    speciality,
    subSpeciality,
    professionalBodies,
    employers,
    termsOfEmployment,
    HIVProgramTime, countyInfo, genderInfo
} from "../list/staff";
import classes from "../../styles/login.module.css";


import {API} from "../../config";


const StaffCreate = () => {

    const [values, setValues] = useState({
        selectTitleOptions: [],
        selectDisabilityOptions: [],
        selectGenderOptions: [],
        selectEthnicityOptions: [],
        selectMaritalOptions: [],
        selectCountyOptions: [],
        selectFacilityOptions: [],
        selectSubSpecialityArr: [],
        selectSpecialityArr: [],
        selectFacilityCodeOptions: [],
        selectSpecialityOptions: [],
        selectSubSpecialityOptions: [],
        professionalBodyOptions: [],
        employerOptions: [],
        employmentTermsOptions: [],
        hivOptions: [],
        reasonForChangePreCurrentPositionOptions: [],
        positionStatusOptions: [],
        add: '',
        title: '',
        firstname: '',
        otherNames: '',
        surname: '',
        disabilityOption: '',
        idNo: '',
        eNo: '',
        dob: '',
        ethnicityOpt: '',
        gender: '',
        marital: '',
        county: '',
        telephone: '',
        email: '',
        mailingAddress: '',
        employeeStatus: '',
        designationStatus: '',
        positionTitle: '',
        facility: 'Vihiga County Referral Hospital',
        facilityCode: '16157',
        hireDate: '',
        reasonForChangePreCurrentPosition: '',
        positionStatus: '',
        endDate: '',
        specialityArr: '',
        subSpecialityArr: '',
        professionalBody: '',
        registrationNo: '',
        licenceNo: '',
        employer: '',
        employmentTerms: '',
        hiv: '',
        loading: false,
        error: '',
        message: '',

    });

    const [showForm, setShowForm] = useState(true)

    const {
        selectDisabilityOptions,
        selectGenderOptions,
        selectTitleOptions,
        selectEthnicityOptions,
        selectMaritalOptions,
        selectCountyOptions,
        selectEmployeeStatusOptions,
        selectDesignationOptions,
        selectFacilityOptions,
        selectFacilityCodeOptions,
        reasonForChangePreCurrentPositionOptions,
        positionStatusOptions,
        selectSpecialityOptions,
        selectSubSpecialityOptions,
        professionalBodyOptions,
        employerOptions,
        employmentTermsOptions,
        hivOptions,
        error,
        loading,
        message,

    } = values;

    useEffect(() => {
        getOptions()
    }, [])

    function getOptions() {
        const selectTitleOptions = titles.map(t => {
            if (t === ' ') {
                return {
                    "value": '',
                    "label": "none"
                }
            }
            return ({
                "value": t,
                "label": t
            });
        })
        const selectDisabilityOptions = disability.map(t => {
            if (t === ' ') {
                return {
                    "value": '',
                    "label": "none"
                }
            }
            return ({
                "value": t,
                "label": t
            });
        })
        const selectGenderOptions = genderInfo.map(t => {
            if (t === ' ') {
                return {
                    "value": '',
                    "label": "none"
                }
            }
            return ({
                "value": t,
                "label": t
            });
        })
        const selectEthnicityOptions = ethnicity.map(t => {
            if (t === ' ') {
                return {
                    "value": '',
                    "label": "none"
                }
            }
            return ({
                "value": t,
                "label": t
            });
        })
        const selectMaritalOptions = maritalStatus.map(t => {
            if (t === ' ') {
                return {
                    "value": '',
                    "label": "none"
                }
            }
            return ({
                "value": t,
                "label": t
            });
        })
        const selectCountyOptions = countyInfo.map(t => {
            if (t === ' ') {
                return {
                    "value": '',
                    "label": "none"
                }
            }
            return ({
                "value": t,
                "label": t
            });
        })
        const selectEmployeeStatusOptions = employeeStatuses.map(t => {
            if (t === ' ') {
                return {
                    "value": '',
                    "label": "none"
                }
            }
            return ({
                "value": t,
                "label": t
            });
        })
        const selectDesignationOptions = designation.map(t => {
            if (t === ' ') {
                return {
                    "value": '',
                    "label": "none"
                }
            }
            return ({
                "value": t,
                "label": t
            });
        })
        const selectFacilityOptions = facilityOptions.map(t => {
            if (t === ' ') {
                return {
                    "value": '',
                    "label": "none"
                }
            }
            return ({
                "value": t,
                "label": t
            });
        })
        const selectFacilityCodeOptions = facilityCodes.map(t => {
            if (t === ' ') {
                return {
                    "value": '',
                    "label": "none"
                }
            }
            return ({
                "value": t,
                "label": t
            });
        })
        const reasonForChangePreCurrentPositionOptions = positionChangeReason.map(t => {
            if (t === ' ') {
                return {
                    "value": '',
                    "label": "none"
                }
            }
            return ({
                "value": t,
                "label": t
            });
        })
        const selectSpecialityOptions = speciality.map(t => {
            if (t === ' ') {
                return {
                    "value": '',
                    "label": "none"
                }
            }
            return ({
                "value": t,
                "label": t
            });
        })
        const selectSubSpecialityOptions = subSpeciality.map(t => {
            if (t === ' ') {
                return {
                    "value": '',
                    "label": "none"
                }
            }
            return ({
                "value": t,
                "label": t
            });
        })
        const professionalBodyOptions = professionalBodies.map(t => {
            if (t === ' ') {
                return {
                    "value": '',
                    "label": "none"
                }
            }
            return ({
                "value": t,
                "label": t
            });
        })
        const employerOptions = employers.map(t => {
            if (t === ' ') {
                return {
                    "value": '',
                    "label": "none"
                }
            }
            return ({
                "value": t,
                "label": t
            });
        })
        const employmentTermsOptions = termsOfEmployment.map(t => {
            if (t === ' ') {
                return {
                    "value": '',
                    "label": "none"
                }
            }
            return ({
                "value": t,
                "label": t
            });
        })
        const hivOptions = HIVProgramTime.map(t => {
            if (t === ' ') {
                return {
                    "value": '',
                    "label": "none"
                }
            }
            return ({
                "value": t,
                "label": t
            });
        })
        const positionStatusOptions = positionStatusList.map(t => {
            if (t === ' ') {
                return {
                    "value": '',
                    "label": "none"
                }
            }
            return ({
                "value": t,
                "label": t
            });
        })

        setValues({
            selectTitleOptions,
            selectDisabilityOptions,
            selectGenderOptions,
            selectEthnicityOptions,
            selectMaritalOptions,
            selectCountyOptions,
            selectEmployeeStatusOptions,
            selectDesignationOptions,
            selectFacilityOptions,
            selectFacilityCodeOptions,
            reasonForChangePreCurrentPositionOptions,
            positionStatusOptions,
            selectSpecialityOptions,
            selectSubSpecialityOptions,
            professionalBodyOptions,
            employerOptions,
            employmentTermsOptions,
            hivOptions

        })
    }

    const handleChange = name => e => {
        setValues({...values, error: '', [name]: e.target.value.trim()});
    };
    const handleSelect = name => e => {
        setValues({...values, error: '', [name]: e.value});
    };


    const showLoading = () => (loading ? <div className="alert alert-info">Saving data please wait...</div> : '');
    const showErrorMessage = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showSuccessMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');


    function handleSubmit(e) {
        e.preventDefault()
        setValues({...values, loading: true, error: ''});
        axios.post(`${API}/staff-info`, values)
            .then(function (response) {
                setValues({
                    ...values,
                    error: '',
                    message: response.data.message,
                    loading: false,

                })
                setShowForm(false)


                setTimeout(function () {
                    window.location.reload(1);
                }, 5000);
            })
            .catch(function (error) {
                if (error.response) {
                    setValues(
                        {
                            ...values,
                            error: error.response.data.error,
                            loading: false
                        }
                    );

                }

            });

    }


    const form = () => <form onSubmit={handleSubmit} className='row gy-3 w-100'>
        <div className="col-12">
            <label htmlFor="name" className="form-label">Title</label>
            <Select
                required
                options={selectTitleOptions}
                onChange={handleSelect('title')}/>
        </div>

        <div className="col-12">
            <label htmlFor="name" className="form-label">First Name</label>
            <div className="input-group ">
                <input
                    required
                    onChange={handleChange('firstname')}
                    type="text"
                    name="firstname"
                    className="form-control"
                />
            </div>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">Other Names</label>
            <div className="input-group ">
                <input
                    onChange={handleChange('otherNames')}
                    type="text"
                    name="otherNames"
                    className="form-control"
                />
            </div>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">Surname</label>
            <div className="input-group ">
                <input
                    onChange={handleChange('surname')}
                    type="text"
                    name="surname"
                    className="form-control"
                />
            </div>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">Disability Type</label>
            <Select
                options={selectDisabilityOptions}

                onChange={handleSelect('disabilityOption')}/>
        </div>

        <div className="col-12">
            <label htmlFor="name" className="form-label">ID Number</label>
            <div className="input-group ">
                <input
                    onChange={handleChange('idNo')}
                    type="text"
                    name="idNo"
                    className="form-control"
                />
            </div>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">Employment No.</label>
            <div className="input-group ">
                <input
                    onChange={handleChange('eNo')}
                    type="text"
                    name="eNo"
                    className="form-control"
                />
            </div>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">Date Of Birth</label>
            <div className="input-group ">
                <input
                    onChange={handleChange('dob')}
                    type="date"
                    name="dob"
                    className="form-control"
                />
            </div>
        </div>

        <div className="col-12">
            <label htmlFor="name" className="form-label">Gender</label>
            <Select
                options={selectGenderOptions}
                onChange={handleSelect('gender')}/>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">Ethnicity</label>
            <Select
                options={selectEthnicityOptions}
                onChange={handleSelect('ethnicityOpt')}/>
        </div>

        <div className="col-12">
            <label htmlFor="name" className="form-label">Marital Status</label>
            <Select
                options={selectMaritalOptions}
                onChange={handleSelect('marital')}/>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">County of Residence</label>
            <Select
                options={selectCountyOptions}
                onChange={handleSelect('county')}/>
        </div>

        <div className="col-12">
            <label htmlFor="name" className="form-label">Telephone No.</label>
            <div className="input-group ">
                <input
                    onChange={handleChange('telephone')}
                    type="text"
                    name="telephone"
                    className="form-control"
                />
            </div>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">Email</label>
            <div className="input-group ">
                <input
                    onChange={handleChange('email')}
                    type="email"
                    name="email"
                    className="form-control"
                />
            </div>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">Mailing Address</label>
            <div className="input-group ">
                <input
                    onChange={handleChange('mailingAddress')}
                    type="text"
                    name="mailingAddress"
                    className="form-control"
                />
            </div>
        </div>

        <div className="col-12">
            <label htmlFor="name" className="form-label">Employee Status</label>
            <Select
                options={selectEmployeeStatusOptions}
                onChange={handleSelect('employeeStatus')}/>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">Job designation</label>
            <Select
                options={selectDesignationOptions}
                onChange={handleSelect('designationStatus')}/>
        </div>

        <div className="col-12">
            <label htmlFor="name" className="form-label">Position Title</label>
            <div className="input-group ">
                <input
                    onChange={handleChange('positionTitle')}
                    type="text"
                    name="positionTitle"
                    placeholder='eg CASCO,SCHRIO,SPHN , N/A,ETC'
                    className="form-control"
                />
            </div>
        </div>
        {/*<div className="col-12">*/}
        {/*    <label htmlFor="name" className="form-label">Facility Name</label>*/}
        {/*    <Select*/}
        {/*        options={selectFacilityOptions}*/}
        {/*        onChange={handleSelect('facility')}/>*/}
        {/*</div>*/}
        {/*<div className="col-12">*/}
        {/*    <label htmlFor="name" className="form-label">Facility Code</label>*/}
        {/*    <Select*/}
        {/*        options={selectFacilityCodeOptions}*/}
        {/*        onChange={handleSelect('facilityCode')}/>*/}
        {/*</div>*/}

        <div className="col-12">
            <label htmlFor="name" className="form-label">Facility Name</label>
            <div className="input-group ">
                <input
                    onChange={handleChange('facility')}
                    type="text"
                    readOnly
                    placeholder='Vihiga County Referral Hospital'
                    name="facility"
                    className="form-control"
                />
            </div>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">Facility Code</label>
            <div className="input-group ">
                <input
                    onChange={handleChange('facilityCode')}
                    type="text"
                    readOnly
                    placeholder='16157'
                    name="facilityCode"
                    className="form-control"
                />
            </div>
        </div>

        <div className="col-12">
            <label htmlFor="name" className="form-label">Hire Date/Date Posted</label>
            <div className="input-group ">
                <input
                    onChange={handleChange('hireDate')}
                    type="date"
                    name="hireDate"
                    className="form-control"
                />
            </div>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">End Date of Previous/Current Position</label>
            <div className="input-group ">
                <input
                    onChange={handleChange('endDate')}
                    type="date"
                    name="endDate"
                    className="form-control"
                />
            </div>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">Reason for Changing Previous/Current Positions</label>
            <Select
                options={reasonForChangePreCurrentPositionOptions}
                onChange={handleSelect('reasonForChangePreCurrentPosition')}/>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">Position Status</label>
            <Select
                options={positionStatusOptions}
                onChange={handleSelect('positionStatus')}/>
        </div>


        <div className="col-12">
            <label htmlFor="name" className="form-label">Speciality</label>
            <Select

                options={selectSpecialityOptions}
                onChange={handleSelect('specialityArr')}/>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">Sub Speciality</label>
            <Select
                options={selectSubSpecialityOptions}
                onChange={handleSelect('subSpecialityArr')}/>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">Professional Body</label>
            <Select
                options={professionalBodyOptions}
                onChange={handleSelect('professionalBody')}/>
        </div>


        <div className="col-12">
            <label htmlFor="name" className="form-label">Registration No</label>
            <div className="input-group ">
                <input
                    onChange={handleChange('registrationNo')}
                    type="text"
                    name="registrationNo"
                    className="form-control"
                />
            </div>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">Practicing licence No</label>
            <div className="input-group ">
                <input
                    onChange={handleChange('licenceNo')}
                    type="text"
                    name="licenceNo"
                    className="form-control"
                />
            </div>
        </div>

        <div className="col-12">
            <label htmlFor="name" className="form-label">Employer</label>
            <Select
                options={employerOptions}
                onChange={handleSelect('employer')}/>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">Terms of Employment</label>
            <Select
                options={employmentTermsOptions}
                onChange={handleSelect('employmentTerms')}/>
        </div>
        <div className="col-12">
            <label htmlFor="name" className="form-label">HIV Program Time(%)</label>
            <Select
                options={hivOptions}
                onChange={handleSelect('hiv')}/>
        </div>
        <div className="col-12">
            {showErrorMessage()}
        </div>
        <div className="col-12">
            {showSuccessMessage()}
        </div>

        <div className="col-12">
            <button className={`btn btn-secondary w-100 ${classes.Btn}`}
                    type="submit">Save
            </button>
        </div>
        {showLoading()}
    </form>

    return (
        <section
            className={` ${classes.Section} temporary`}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className=" col-md-6 d-flex flex-column align-items-center justify-content-center">
                        <div className={`card mb-3 ${classes.Card}`}>

                            <div className={`card-body pb-4${classes.CardBody}`}>
                                {form()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    )
};

export default StaffCreate;
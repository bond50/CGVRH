import React, {Component, useEffect, useState} from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

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
import {calculateTimeLeft} from "../reusables/functions/calculateTimeLeft";
import {useRouter} from "next/router";


const StaffCreate = () => {
    const router = useRouter()

    const date_future = +new Date(2022, 6, 14, 23, 59, 59);
    const date_now = +new Date();
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date_future, date_now));
    const [values, setValues] = useState({
        selectTitleOptions: [],
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(date_future, date_now));
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];
    Object.keys(timeLeft).forEach((interval, index) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span key={index}>
      {timeLeft[interval]} {interval}{" "}
    </span>
        );
    });


    const {

        selectGenderOptions,
        selectTitleOptions,
        selectEthnicityOptions,
        selectMaritalOptions,
        selectCountyOptions,
        selectEmployeeStatusOptions,
        selectDesignationOptions,

        selectSpecialityOptions,
        selectSubSpecialityOptions,
        professionalBodyOptions,
        employerOptions,
        employmentTermsOptions,

        error,
        loading,
        message,

    } = values;

    useEffect(() => {
        getOptions()
    }, [])

    function getOptions() {
        const selectTitleOptions = titles.map(t => {
            return ({
                "value": t,
                "label": t
            });
        })
        const selectDisabilityOptions = disability.map(t => {
            return ({
                "value": t,
                "label": t
            });
        })


        const selectGenderOptions = genderInfo.map(t => {
            return ({
                "value": t,
                "label": t,

            });
        })
        const selectEthnicityOptions = ethnicity.map(t => {
            return ({
                "value": t,
                "label": t
            });
        })
        const selectMaritalOptions = maritalStatus.map(t => {
            return ({
                "value": t,
                "label": t
            });
        })
        const selectCountyOptions = countyInfo.map(t => {
            return ({
                "value": t,
                "label": t
            });
        })
        const selectEmployeeStatusOptions = employeeStatuses.map(t => {
            return ({
                "value": t,
                "label": t
            });
        })
        const selectDesignationOptions = designation.map(t => {
            return ({
                "value": t,
                "label": t
            });
        })
        const selectFacilityOptions = facilityOptions.map(t => {
            return ({
                "value": t,
                "label": t
            });
        })
        const selectFacilityCodeOptions = facilityCodes.map(t => {
            return ({
                "value": t,
                "label": t
            });
        })
        const reasonForChangePreCurrentPositionOptions = positionChangeReason.map(t => {
            return ({
                "value": t,
                "label": t
            });
        })
        const selectSpecialityOptions = speciality.map(t => {
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
            return ({
                "value": t,
                "label": t
            });
        })
        const employmentTermsOptions = termsOfEmployment.map(t => {
            return ({
                "value": t,
                "label": t
            });
        })
        const hivOptions = HIVProgramTime.map(t => {
            return ({
                "value": t,
                "label": t
            });
        })
        const positionStatusOptions = positionStatusList.map(t => {
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
        if (e) {
            setValues({...values, error: '', [name]: e.value});
        }
    };
    const handleMultiSelect = name => e => {
        if (e) {
            let myArr = []
            e.map(item => {
                myArr.push(item.value.trim())
            })
            setValues({...values, error: '', [name]: myArr.join(';')});
        }
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


                setTimeout(function () {
                    router.push('/staff-data')
                }, 1000);
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
            <label className="form-label">Title</label>
            <CreatableSelect
                isClearable
                className={classes.select}
                onChange={handleSelect('title')}
                onInputChange={handleSelect('title')}
                options={selectTitleOptions}
            />

        </div>

        <div className="col-12">
            <label className="form-label">First Name</label>
            <div className="input-group ">
                <input
                    onChange={handleChange('firstname')}
                    type="text"
                    name="firstname"
                    className="form-control"
                />
            </div>
        </div>
        <div className="col-12">
            <label className="form-label">Other Names</label>
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
            <label className="form-label">Surname</label>
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
            <label className="form-label">ID Number</label>
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
            <label className="form-label">Employment No.</label>
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
            <label className="form-label">Date Of Birth</label>
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
            <label className="form-label">Gender</label>
            <CreatableSelect
                isClearable
                className={classes.select}
                onChange={handleSelect('gender')}
                onInputChange={handleSelect('gender')}
                options={selectGenderOptions}
            />
        </div>
        <div className="col-12">
            <label className="form-label">Ethnicity</label>
            <CreatableSelect
                isClearable
                className={classes.select}
                placeholder='start typing for autocompletion'
                onChange={handleSelect('ethnicityOpt')}
                onInputChange={handleSelect('ethnicityOpt')}
                options={selectEthnicityOptions}
            />
        </div>

        <div className="col-12">
            <label className="form-label">Marital Status</label>
            <CreatableSelect
                isClearable
                className={classes.select}
                onChange={handleSelect('marital')}
                onInputChange={handleSelect('marital')}
                options={selectMaritalOptions}
            />

        </div>
        <div className="col-12">
            <label className="form-label">County of Residence</label>
            <CreatableSelect
                isClearable
                className={classes.select}
                placeholder='start typing for autocompletion'
                onChange={handleSelect('county')}
                onInputChange={handleSelect('county')}
                options={selectCountyOptions}
            />
        </div>

        <div className="col-12">
            <label className="form-label">Telephone No.</label>
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
            <label className="form-label">Email</label>
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
            <label className="form-label">Employee Status</label>
            <Select
                options={selectEmployeeStatusOptions}
                onChange={handleSelect('employeeStatus')}/>
        </div>
        <div className="col-12">
            <label className="form-label">Job designation</label>

            <CreatableSelect
                isClearable
                className={classes.select}
                placeholder='start typing for autocompletion'
                onChange={handleSelect('designationStatus')}
                onInputChange={handleSelect('designationStatus')}
                options={selectDesignationOptions}
            />
        </div>

        <div className="col-12">
            <label className="form-label">Position Title</label>
            <div className="input-group ">
                <input
                    onChange={handleChange('positionTitle')}
                    type="text"
                    name="positionTitle"
                    placeholder='eg CASCO,SCHRIO,SPHN,N/A, ETC'
                    className="form-control"
                />
            </div>
        </div>


        <div className="col-12">
            <label className="form-label">Facility Name</label>
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
            <label className="form-label">Facility Code</label>
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
            <label className="form-label">Hire Date/Date Posted</label>
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
            <label className="form-label">Speciality</label>
            <CreatableSelect
                isClearable
                className={classes.select}
                isMulti
                placeholder='select multiple if applicable'
                onChange={handleMultiSelect('specialityArr')}
                onInputChange={handleSelect('specialityArr')}
                options={selectSpecialityOptions}
            />
        </div>
        <div className="col-12">
            <label className="form-label">Sub Speciality</label>
            <CreatableSelect
                isClearable
                className={classes.select}
                placeholder='select multiple if applicable'
                isMulti
                onChange={handleMultiSelect('subSpecialityArr')}
                onInputChange={handleSelect('subSpecialityArr')}
                options={selectSubSpecialityOptions}
            />
        </div>
        <div className="col-12">
            <label className="form-label">Professional Body</label>
            <CreatableSelect
                isClearable
                className={classes.select}

                placeholder='start typing for autocompletion'
                onChange={handleSelect('professionalBody')}
                onInputChange={handleSelect('professionalBody')}
                options={professionalBodyOptions}
            />
        </div>


        <div className="col-12">
            <label className="form-label">Registration No</label>
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
            <label className="form-label">Practicing licence No</label>
            <div className="input-group ">
                <input
                    onChange={handleChange('licenceNo')}
                    type="text"
                    name="licenceNo"
                    className={`form-control`}
                />
            </div>
        </div>

        <div className="col-12">
            <label className="form-label">Employer</label>

            <CreatableSelect
                isClearable
                className={classes.select}
                onChange={handleSelect('employer')}
                onInputChange={handleSelect('employer')}
                options={employerOptions}
            />

        </div>
        <div className="col-12">
            <label className="form-label">Terms of Employment</label>
            <CreatableSelect
                isClearable
                className={classes.select}
                placeholder='start typing for autocompletion'
                options={employmentTermsOptions}
                onInputChange={handleSelect('employmentTerms')}
                onChange={handleSelect('employmentTerms')}/>
        </div>

        <div className="col-12">
            {showErrorMessage()}
        </div>
        <div className="col-12">
            {showSuccessMessage()}
        </div>

        <div className="col-12">
            <button className={`btn btn-secondary w-100 ${classes.Btn}`}
                    type="submit" disabled={loading}>Submit
            </button>
        </div>
        {showLoading()}
    </form>


    return (
        <section
            className={` `}>
            <div className="container">


                <div className="row justify-content-center">
                    <div className=" col-lg-6 col-md-12 d-flex flex-column align-items-center justify-content-center">
                        <div className="section-title ">
                            <h2 style={{textTransform: 'none', fontWeight: '500'}}>
                                <p> Remaining time :</p>
                            </h2>
                            <p className='alert-danger' style={{
                                fontWeight: '600',
                                fontSize: '22px'
                            }}>{timerComponents.length ? timerComponents : null}</p>
                        </div>

                        <div className={`card mb-3 ${classes.Card}`}>
                            {timerComponents.length ? <div className={`card-body ${classes.CardBody}`}>
                                    <div className={`pt-4 pb-2 ${classes.CardTitle}`}>

                                        <h5 className={` pb-0 fs-4`}> Submit your information through this
                                            form</h5>
                                        <span className="text-center small text-muted">For dropdowns,if the item you are
                                        looking for is
                                        not available,just type in the input whatever you want and click
                                        on <strong>create</strong> option that pops
                                        up
                                        </span>
                                    </div>
                                    {form()}
                                    <p className='text-danger'>
                                        Remaining time :
                                        <span>{timerComponents.length ? timerComponents : null}</span>
                                    </p>

                                </div> :
                                <div className={classes.CardTitle}>
                                    <div className="container">
                                        <p>
                                            <span>Sorry, we no longer accept online submission.Please visit Human Resource Department to manually submit your Data before date <strong>24/07/2022</strong>.Thank you</span>
                                        </p>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
};

export default StaffCreate;
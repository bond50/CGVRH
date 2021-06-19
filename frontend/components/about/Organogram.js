import AboutContainer from "../reusables/AboutContainer";
import List from "../reusables/List";

const Organogram = () => {
    const medsupList = [
        {
            desc: 'Medical Superintendent is the head of the institution. His responsibilities include :',
            content: [
                {name: 'Supervision of clinical and administrative functions at the facility.',},
                {name: 'He is the secretary to the hospital board and the chair of the hospital management team and the Executive expenditure committee.',},
                {name: 'Serves as the hospital spokesman.',},
            ]
        },
    ]

    const nursingOfficer = [
        {
            content: [
                {name: 'Is in charge of all the nurses at the facility and serves as the custodian of nursing care within the institution.',},
                {name: 'He also supervises auxiliary services including nutrition, comprehensive care clinic, Laundry and Social work.',},
            ]
        },
    ]

    const dmedsupList = [
        {
            content: [
                {name: 'Acts as the principal assistant to the Medical Superintendent performing duties in his absence or under delegation of the Medical Superintendent.',},
            ]
        },
    ]

    const admin = [
        {
            content: [
                {name: 'She serves as the immediate supervisor of administrative functions at the facility. This includes Human Resource, Supply Chain Management, Finance, Transport, Security, Housing, Maintenance and Biomedical engineering.',},
                {name: 'She is the secretary to the EEC and the HMT.',},
            ]
        },
    ]

    const co = [
        {
            content: [
                {name: 'Acts as the immediate supervisor for all clinical services at the facility.',},
                {name: 'He supervises Consultants, Specialists, Medical Officers, and Clinical Officers, interns and students on clinical attachment.\n.',},
                {name: 'He also supervises Pharmacy and Diagnostics at the facility.',},
            ]
        },
    ]

    return <AboutContainer title='THE HOSPITAL MANAGEMENT STRUCTURE'>
        <p>Vihiga County Referral Hospital is the main hospital within Vihiga County serving as a referral facility for
            Sub County and Health centers within the County. It attained its level five status in August 2017. The
            hospital has an integrated organizational structure with various departments and committees working to
            ensure good leadership and governance at the facility
        </p>

        <h4>Medical Superintendent</h4>
        <List list={medsupList}/>

        <h4>Deputy Medical Superintendent</h4>
        <List list={dmedsupList}/>

        <h4>Nursing officer in charge</h4>
        <List list={nursingOfficer}/>

        <h4>Hospital Administrator</h4>
        <List list={admin}/>

        <h4>Head of clinical services</h4>
        <List list={co}/>


    </AboutContainer>;
};

export default Organogram;
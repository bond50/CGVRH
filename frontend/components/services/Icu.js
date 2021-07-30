import AboutContainer from "../reusables/AboutContainer";
import List from "../reusables/List";

const ICU = () => {

    const obligations = [
        {
            content: [
                {name: 'The family shall disclose bonafide next of kin and a family spokesman to be duly documented in file.'},
                {name: 'Honor occurred bills.'},
                {name: 'Provide specimen signatures of the next of kin.'},

            ]
        },
    ]

    const familyRights = [
        {
            content: [
                {name: ' Right to counselling in the pre-admission period'},
                {name: ' Right to information, prognostication and counselling through family conferencing'},
                {name: ' Right to receive daily accrued bills.'},

            ]
        },
    ]

    const adminCriteria = [
        {
            content: [
                {name: ' Severe sepsis requiring hemodynamicand respiratory support'},
                {name: ' Hemorrhagic/septic/cardiogenic/amaphylactic shock requiring hemodynamic monitoring and inotropic support'},
                {name: ' For ventilator support in patients with respiratory failure, neurological impairment'},
                {name: ' Cardio respiratort support for traumatic head injury'},
                {name: ' Post cardiac arrest care when ROSC is achieved'},
                {name: ' Multiple organ dysfunction and polytrauma in axtreme age'},
                {name: ' Acid/ base impairement requiring treatment and cardiopulmonary monitoring'},
                {name: ' Reversible metabolicimpairements that require cardio respiratory monitoring and support'},
                {name: ' Post op care for cranial, cardiac, liver, renal surgery'},
                {name: ' Post op care in patient with severe peritonisis requiring hemadynamic support and total  parenteral nutrition '},

            ]
        },
    ]


    const investigations = [
        {
            content: [

                {name: 'Before admission patients must have the following investigations done;'},
                {name: 'CT Scan head for head injury and patients with suspected CNS lesions'},
                {name: 'Coagulation profile for patients with suspected coagulopathics'},
                {name: 'FHG'},
                {name: 'During the admission these tests shall be done concurrently'},
                {name: 'UECR LFTS'},
                {name: 'BLOOD SUGAR'},
                {name: 'CXR'},
                {name: 'ABGA'},

            ]
        },
    ]

    const initialMgt = [
        {
            content: [
                {name: ' The patient shall be properly clerked by th e admitting doctor / clinician and consult withthe consultant incharge of the patient as necessary.'},
                {name: ' Severity score'},
                {name: ' Catheterization'},
                {name: ' NGT placement'},
                {name: ' Intubation CXR after intubation for ETT depth assessment'},
                {name: ' DVT prophylaxis and peptic ulcer propylaxis ulcers there are contraindications'},
                {name: ' Septic screen'},
            ]
        },
    ]

    return <AboutContainer
        title='icu' para={`The Intensive Care Unit admissions`}>

        <p>An ICU/HDU constitute of a bed, working monitor and adequate nurse to patient ratio of 1:1 to
            1:1:5 at any given point. Besides the above there should be arescnitation trolley with incubation
            equipment, suction machine, defibrillator
        </p>

        <h4>Admission Process</h4>
        <p>
            Patients within the hospital shall be reviewed by the ICU doctor/Clinician who shall consult both
            the primary Doctor and the anaesthesologist/intensivist.Once the patient meets the eligibility
            criteria; bed availability will be confirmed by the team leader in the ICU and plans to admit the
            patient instituted. Patients from outside the hospital shall receive a communication through the
            Nurse covering mobile number <strong>0723103564</strong> who shall then confirm bed availability with the
            icu
            team leader. The intensivist/anaessthesiologist shall be notified by the ICU leader/Clinician of
            admission of sensitive patients and post-operative patients.
            Patients shall be transfereed from private ICU facility after 5pm over the weekends
        </p>

        <h4>Investigations</h4>
        <List list={investigations}/>

        <h4>Initial Management</h4>
        <List list={initialMgt}/>
        <h4>Admission Criteria</h4>
        <p>Patients with reversible physiological impairment</p>
        <List list={adminCriteria}/>

        <h4>Family Rights</h4>
        <List list={familyRights}/>
        <p><b>Euthanasia</b> is <b>NOT</b> practiced in this hospital in accordance with the constitution.
        </p>

        <h4>Family Obligations</h4>
        <p>Patients with reversible physiological impairment</p>
        <List list={obligations}/>


    </AboutContainer>;
};

export default ICU;
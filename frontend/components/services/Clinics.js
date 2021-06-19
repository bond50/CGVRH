import AboutContainer from "../reusables/AboutContainer";
import List from "../reusables/List";

const Clinics = () => {
    const list = [
        {
            header: 'Medical Outpatient Clinic (MOPC):',
            desc: 'Every Monday and Friday 8am -1pm',
        },
        {
            header: 'Surgical Outpatient Clinic (SOPC):',
            desc: 'Every Wednesday 8am -1pm',
        },
        {
            header: 'Paediatric Outpatient Clinic (POPC):',
            desc: 'Every Thursday 8am -1pm',
        }, {
            header: 'Gynaecological Outpatient Clinic (GOPC):',
            desc: 'Every Thursday 8am -1pm',
        }, {
            header: 'Eye Clinic :',
            desc: 'Monday - Friday 8am -4pm',
        }, {
            header: 'Psychiatric Clinic :',
            desc: 'Monday - Friday 8am -4pm',
        }, {
            header: 'Orthopaedic Clinic :',
            desc: 'Monday - Friday 8am -4pm',
        },
    ]

    return <AboutContainer title='Crucial information about our clinics'>
        <List list={list}/>
    </AboutContainer>;
};

export default Clinics;
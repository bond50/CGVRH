import AboutContainer from "../reusables/AboutContainer";
import List from "../reusables/List";

const Pharmacy = () => {
    const list = [
        {
            content: [
                {name: 'Outpatient Pharmacy',},
                {name: 'NHIF pharmacy',},
                {name: 'Amenity Pharmacy',},
                {name: 'MCH/Under-5 Pharmacy',},
            ]
        },
    ]


    return <AboutContainer title='Pharmacy' para={`The Vihiga County Referral Hospital Pharmacy`}>
        <p>The pharmacy team in Vihiga County Referral Hospital is highly skilled and offer professional services to
            clients.We offer both outpatient and inpatient services. We dispense standard medicines at affordable
            prices. Our in house committee inspects the medicines before stocking. The Hospital procures all medicines
            and medical supplies only from registered suppliers thereby guaranteeing our patients quality medicines at
            all times, especially in light of the risk of counterfeit and substandard products in the industry.</p>
        <div>
            <h4>Pharmacy Services</h4>
            <p>The main pharmacy is in Kenya,Vihiga County ,Along Kisumu-Kakamega road at mbale centre within Vihiga
                County referral Hospital ,on the basement next to ICT/PABX Room. The main outpatient Pharmacy operates
                at 24/7 basis.We offer services even at night and on weekends at highly secured environment. We also
                have other pharmacy outlets within the Hospital the second most common one is the NHIF out patient
                Pharmacy located next to physiotherapy department</p>
            <p>We offer services to all categories of patients and clients be it inpatient ,outpatient or walk in
                patient provided the patient is seen by the doctor within or outside the hospital.At night patients are
                assured of best services</p>
            <p>We look forward to ensure that all prescribed medicines are available at our pharmacy at better
                discounted prices</p>
            <h4>Vihiga County referral Hospital Has the following Pharmacy Outlets
            </h4>
            <List list={list}/>
        </div>


    </AboutContainer>;
};

export default Pharmacy;

import AboutContainer from "../reusables/AboutContainer";
import List from "../reusables/List";



const Directorates = () => {
    const list = [
        {
            desc: 'The clinical services provided include:',
            content: [
                {name: 'Internal Medicine',},
                {name: 'General surgery and anesthesia',},
                {name: 'Pediatrics',},
                {name: 'Obstetrics and gynecology',},
                {name: 'Dental services',},
                {name: 'Psychiatry',},
                {name: 'Ophthalmology',},
                {name: 'Pharmaceutical services',},
                {name: 'Ambulatory and emergency services',},
                {name: 'Laboratory services',},
                {name: 'Rehabilitative care',},
                {name: 'Counseling',},
                {name: 'Nutritional services',},
                {name: 'Physiotherapy',},
                {name: 'Radiological Imaging services',},
            ]
        },
    ]
    const intro = [
        {title: `The hospital has specialized personnel including general surgeons, physicians, a pediatrician, obstetrician & gynecologist, ophthalmologist, nurses, clinical officers, laboratory technologists, rehabilitative staff and public health staff.`}
    ]

    return <AboutContainer title='Directorates Of Clinical Services' >
        <List
            list={list}
            intro={intro}
        />

    </AboutContainer>;
};

export default Directorates;
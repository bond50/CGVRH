import AboutContainer from "../reusables/AboutContainer";
import List from "../reusables/List";


const CoreValues = () => {
    const list = [

        {
            content: [
                {name: 'Accountability',},
                {name: 'Commitment',},
                {name: 'Integrity',},
                {name: 'Teamwork',},
                {name: 'Innovation',},
            ]
        },
    ]

    return <AboutContainer title='CoreValues'>
        <div className='row'>
           <List list={list}/>
        </div>
    </AboutContainer>;
};

export default CoreValues;
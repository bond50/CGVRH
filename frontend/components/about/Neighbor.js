import React from 'react';
import List from "../reusables/List";


const Board = () => {

    const intro = [
        {
            title: 'Vihiga County has 4 sub-county hospitals, 18 health centers, 23 dispensaries and a number of private and mission hospitals and clinics. The hospital serves as the county referral hospital and is gazetted as a level 5 health institution thus handling critical cases referred from the above lower level facilities. Cases requiring specialized care are referred from dispensaries/clinics (Level 2), health centers (Level 3), sub county hospitals and mission hospitals (Level 4)either sequentially or directly.'
        }]


    return <section className='section'>
        <div className="container">
            <div className="section-title">
                <h2>Neighbouring Facilities</h2>
            </div>

            <List
                intro={intro}
            />
        </div>
    </section>;
};

export default Board;
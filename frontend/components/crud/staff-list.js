import useSWR from "swr";
import {API} from "../../config";
import React, {useEffect, useState} from "react";
import {calculateTimeLeft} from "../reusables/functions/calculateTimeLeft";



export default function redirect() {

    const date_future = +new Date(2022, 6, 14, 23, 59, 59);
    const date_now = +new Date();
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date_future, date_now));

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

    const {data: people, error} = useSWR(`${API}/staff-info`, {
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true
    })


    if (error) return <div className='container uh-oh mt-5 pt-5 '><p>uh oh something is
        wrong..Please
        contact Vihiga county referral hospital ICT team for assistance.Thank you </p></div>
    if (!people) return <div className='preloader'/>


    return (

        <section id="clients1" className="clients  section-bg">
            <div className="container " data-aos="fade-up">

                <div className="section-title ">
                    <h2 style={{textTransform:'none',fontWeight:'500'}}>
                       <p> Remaining time :</p>
                         </h2>
                        <p className='alert-danger' style={{fontWeight:'600',fontSize:'25px'}}>{timerComponents.length ? timerComponents : `0 hours 0 minutes 0 seconds`}</p>

                </div>


                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        {timerComponents.length ? <div className="table-responsive"><table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Number</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Other Names</th>
                                <th scope="col">Surname</th>
                                <th scope="col">Received</th>
                            </tr>
                            </thead>
                            <tbody>
                            {people.map((person, i) => {
                                return <tr key={i}>
                                    <th scope="row" className='d-flex justify-content-center'>{i + 1}</th>
                                    <td  >{person.firstname}</td>
                                    <td >{person.otherNames}</td>
                                    <td >{person.surname}</td>
                                    <td className='d-flex justify-content-center'><i className='bi bi-check-circle ' style={{color: '#198754'}}/></td>
                                </tr>
                            })}
                            </tbody>
                        </table> </div>: <div className="container">
                            <p>
                                <span>Sorry, we no longer accept online submission.Please visit Human Resource Department to manually submit your Data before date <strong>24/07/2022</strong>.Thank you</span>
                            </p>
                        </div>}
                    </div>

                </div>

            </div>
        </section>

    )
}
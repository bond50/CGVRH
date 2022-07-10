import useSWR from "swr";
import {API} from "../../config";


export default function redirect() {
    const {data: people, error} = useSWR(`${API}/staff-info`,{
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
                    <h2>Submitted returns</h2>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <table className="table table-sm table-borderless table-responsive">
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
                                    <th scope="row">{i + 1}</th>
                                    <td>{person.firstname}</td>
                                    <td>{person.otherNames}</td>
                                    <td>{person.surname}</td>
                                    <td><i className='bi bi-check-circle ' style={{color:'#198754'}}></i></td>
                                </tr>
                            })}

                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </section>

    )
}
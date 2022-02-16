import React from 'react';
import classes from '../../../styles/Board.module.css'
import styles from '../../../styles/AboutContainer.module.css'
import Link from 'next/link'
import {API} from "../../../config";
import Image from "../../reusables/lazy/Image";

const Board = ({members}) => {
    const renderMember = () => {
        return members && members.map((m, i) => {
            return <div className="col-lg-3 d-flex align-items-stretch justify-content-center" key={i}>
                <div className={classes.Member}>
                    <div className={classes.MemberImg}>
                        <Link href={`/profile/${m.username}`}>
                            <Image src={`${API}/user/photo/${m.username}`}
                                   width={6720}
                                   height={4480}
                                   layout="responsive"
                                   className="img-thumbnail img-fluid"
                                   alt={`${m.name}'s photo`}/>
                        </Link>
                        <div className={classes.Social}>
                            {m.twitter && <a href={m.twitter}><i className="bi bi-twitter"/></a>}
                            {m.facebook && <a href={m.facebook}><i className="bi bi-facebook"/></a>}
                            {m.instagram && <a href={m.instagram}><i className="bi bi-instagram"/></a>}
                            {m.linkedIn && <a href={m.linkedIn}><i className="bi bi-linkedin"/></a>}
                        </div>
                    </div>
                    <div className={classes.MemberInfo}>
                        <Link href={`/profile/${m.username}`}>
                            <h4>
                                {m.name}
                            </h4>
                        </Link>
                        {m.hospitalRole && <span>{m.hospitalRole}</span>}
                        {m.hmtRole && <span>{m.hmtRole} of HMT</span>}
                        <span>{m.designation}</span>
                    </div>
                </div>
            </div>
        })
    }


    return <section className={`${styles.Section} ${styles.SectionBg}`}>
        <div className="container">
            <div className={styles.SectionTitle} data-aos="fade-up" data-aos-once='true'>
                <h2>Team</h2>
                <p>Our health management team</p>
            </div>

            <div className="row" data-aos="fade-up" data-aos-delay='100'>
                <p>VCRH is run by the Hospital Management Team under the leadership of the Medical Superintendent and
                    supervision by the Hospital Management Committee.
                </p>
                {renderMember()}
            </div>

        </div>
    </section>


};

export default Board;
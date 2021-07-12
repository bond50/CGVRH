import React from 'react';
import classes from '../../../styles/Board.module.css'
import styles from '../../../styles/AboutContainer.module.css'
import {membersList} from "./Members";



const Board = () => {
    const renderMember=()=>{
        return membersList.map((m,i)=>{
            return  <div className="col-lg-3 d-flex align-items-stretch" key={i}>
                    <div className={classes.Member} data-aos="fade-up"  data-aos-once='true'  data-aos-delay={m.delay}>
                        <div className={classes.MemberImg}>
                            <img src={m.src} className="img-thumbnail img-fluid" alt={`${m.name}'s photo`}/>
                            <div className={classes.Social}>
                                <a href={m.twitterLink}><i className="bi bi-twitter"/></a>
                                <a href={m.fbLink}><i className="bi bi-facebook"/></a>
                                <a href={m.instaLink}><i className="bi bi-instagram"/></a>
                                <a href={m.linkedInLink}><i className="bi bi-linkedin"/></a>
                            </div>
                        </div>
                        <div className={classes.MemberInfo}>
                            <h4>{m.name}</h4>
                            <span>{m.description}</span>
                        </div>
                    </div>
                </div>
        })
    }




    return <section className={`${styles.Section} ${styles.SectionBg}`}>
        <div className="container">
            <div className={styles.SectionTitle} data-aos="fade-up" data-aos-once='true' >
                <h2>Our <strong>Team</strong></h2>
                <p>VCRH is run by the Hospital Management Team under the leadership of the Medical Superintendent and
                    supervision by the Hospital Management Committee.
                </p>
            </div>

            <div className="row">
                {renderMember()}
            </div>

        </div>
    </section>


};

export default Board;
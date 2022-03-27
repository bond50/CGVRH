import React from 'react';
import classes from '../../../styles/Board.module.css'

import Link from 'next/link'
import {API, DOMAIN} from "../../../config";
import Image from "next/image";

class Board extends React.Component {


    render() {
        const renderMember = () => {
            return this.props.members && this.props.members.map((m, i) => {
                const imgSrc = `${API}/user/photo/${m.username}`
                const myLoader = () => {
                    return imgSrc;
                }
                return <div className="col-lg-3 d-flex align-items-stretch justify-content-center" key={i}>
                    <div className={classes.Member}>
                        <div className={classes.MemberImg}>
                            <Link href={`/profile/${m.username}`}>
                                <Image src={imgSrc}
                                       loader={myLoader}
                                       width={100}
                                       height={70}
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


        return <section className={`section-bg`}>
            <div className="container" data-aos="fade-up">
                <header className={'section-title'}>
                    <h2>Our Health management team</h2>
                    <p>Click on the image to sent the member a private Email.
                        The TCP connection is encrypted and hence no
                        eavesdropping by a third party. If you are unable to send a private mail to specific user,you
                        can still reach us
                        <Link href={`${DOMAIN}/contact`}> here</Link>
                    </p>
                </header>
                <div className="row" data-aos="fade-up" data-aos-delay='100'>
                    {renderMember()}
                </div>

            </div>
        </section>


    }
}

export default Board;
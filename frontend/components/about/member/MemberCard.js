const MemberCard = ({
                        imgSrc,
                        imgAlt,
                        memberName,
                        memberCadre,
                        memberInfo,
                        twitterLink,
                        fbLink,
                        instaLink,
                        linkedInLink
                    }) =>
    (
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="image-flip">
                <div className="mainflip">
                    <div className="frontside">
                        <div className="card">
                            <div className="card-body text-center">
                                <p>
                                    <img className=" img-fluid"
                                         src={imgSrc}
                                         alt={imgAlt}/>
                                </p>
                                <h4 className="card-title">{memberName}</h4>
                                <p className="card-text">{memberCadre}</p>
                                <a
                                    href={fbLink}
                                    className="btn btn-primary btn-sm">
                                    <i
                                        className="fa fa-plus"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="backside">
                        <div className="card">
                            <div className="card-body text-center mt-4">
                                <h4 className="card-title">{memberName}</h4>
                                <p className="card-text">{memberInfo}</p>
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                        <a className="social-icon text-xs-center" target="_blank"
                                           href={fbLink}>
                                            <i className="fa fa-facebook"/>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a className="social-icon text-xs-center" target="_blank"
                                           href={twitterLink}>
                                            <i className="fa fa-twitter"/>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a className="social-icon text-xs-center" target="_blank"
                                           href="https://www.fiverr.com/share/qb8D02">
                                            <i className={linkedInLink}/>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a className="social-icon text-xs-center" target="_blank"
                                           href={instaLink}>
                                            <i className="fa fa-google"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

export default MemberCard;
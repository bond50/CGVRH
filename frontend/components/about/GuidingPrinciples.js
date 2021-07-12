import classes from '../../styles/Principles.module.css'
import styles from '../../styles/AboutContainer.module.css'

const GuidingPrinciples = () => {

    return <section className={styles.Section}>
        <div className="container">
            <div className="row">

                <div className="col-md-6 d-flex align-items-stretch">
                    <div className={`card ${classes.Card}`} style={{
                        backgroundImage:
                            'url(' +
                            'https://images.unsplash.com/photo-1536784263931-c9bf77120269?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fCUyM21pc3Npb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' +
                            ')'
                    }}>
                        <div className={`card-body ${classes.CardBody}`}>
                            <h5 className={`card-title ${classes.CardTitle}`}><a href="">Our Mission</a></h5>
                            <p className={`card-text ${classes.CardText}`}>To provide quality preventive, curative and
                                rehabilitative health care services.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                    <div className={`card ${classes.Card}`} style={{
                        backgroundImage:
                            'url(' +
                            'https://images.unsplash.com/photo-1532247993688-7eab533efeba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fCUyM3Zpc2lvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' +
                            ')'
                    }}>
                        <div className={`card-body ${classes.CardBody}`}>
                            <h5 className={`card-title ${classes.CardTitle}`}><a href="">Our Vision</a></h5>
                            <p className={`card-text ${classes.CardText}`}> A facility of choice in health care
                                provision</p>

                        </div>
                    </div>

                </div>
                <div className="col-md-6 d-flex align-items-stretch mt-4">
                    <div className={`card ${classes.Card}`} style={{
                        backgroundImage:
                            'url(' +
                            'https://images.unsplash.com/photo-1617721950728-3290d9fbfc86?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvcmUlMjB2YWx1ZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' +
                            ')'
                    }}>
                        <div className={`card-body ${classes.CardBody}`}>
                            <h5 className={`card-title ${classes.CardTitle}`}><a href="">Our Core values</a></h5>
                            <p className={`card-text ${classes.CardText}`}>
                                Accountability,
                                Commitment,
                                Integrity,
                                Teamwork,
                                Innovation,
                            </p>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
};

export default GuidingPrinciples;
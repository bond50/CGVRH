import classes from '../../styles/AboutContainer.module.css'

const AboutContainer = ({children, title, className, para, id}) => (
    <section id={id}>
        <div className="container">
            <div className={`row  justify-content-center`}>
                <div className={classes.Title} data-aos="fade-up" data-aos-once='true'>
                    <h3>{title}</h3>
                    <p>{para}</p>
                </div>
            </div>


            <div className='row'>
                <div className={`${className} `} data-aos="fade-up" data-aos-delay='200' data-aos-once='true'>
                    <div className={`col-md-8`}>
                        {children}
                    </div>
                  <div className="col-md-4 border-2">

                    <div className='mb-3'>
                        <h5>Quick Links</h5>
                        <hr/>
                        <div style={{maxHeight: '200px', overflowY: 'auto'}} className='list-group list-group-flush'>
                            none
                        </div>
                    </div>
                    <div>
                        <h5>Top Downloads</h5>
                        <hr/>
                        <div style={{maxHeight: '200px', overflowY: 'auto'}} className='list-group list-group-flush'>none</div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
)
AboutContainer.defaultProps = {
    className: 'row '
};

export default AboutContainer;
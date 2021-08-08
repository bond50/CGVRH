import classes from '../../styles/AboutContainer.module.css'


const AboutContainer = ({children, title, para, id}) => (
    <>
        <section id={id} className={`${classes.Section} ${classes.SectionBg}`}>
            <div className={`container ${classes.myContainer}`}>
                <div className={classes.SectionTitle} data-aos="fade-up">
                    <h2>{title}</h2>
                    <p>{para}</p>
                </div>
                <div data-aos="fade-up" data-aos-delay={`100`} data-aos-once='true'>
                    {children}
                </div>
            </div>
        </section>

        {/*<section id={id} className={`${classes.Section}`}>*/}
        {/*    <div className="container">*/}
        {/*        <div className='row'>*/}
        {/*            <div className={`${className} `} data-aos="fade-up" data-aos-delay='200' data-aos-once='true'>*/}
        {/*                <div className={`col-md-8`}>*/}
        {/*                     <div className={classes.SectionTitle} data-aos="fade-up" data-aos-once='true'>*/}
        {/*                    <h3>{title}</h3>*/}
        {/*                    <p>{para}</p>*/}
        {/*                </div>*/}
        {/*                    {children}*/}
        {/*                </div>*/}
        {/*                <div className="col-md-4">*/}
        {/*                    <SideBar>*/}

        {/*                    </SideBar>*/}
        {/*                </div>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</section>*/}
    </>
)


export default AboutContainer;
import classes from '../../styles/CoreValues.module.css'
import Link from "next/link";

const CoreValues = () => {
    const list = [
        {
            title: 'Our Vision',
            delay: '0',
            classname: '',
            para: ' A facility of choice in health care provision'
        },
        {
            title: 'Our Mission',
            delay: '200',
            classname: 'mt-4 mt-lg-0',
            para: 'To provide quality preventive,\n' +
                '                                curative and rehabilitative health care services.'
        },
        {
            title: 'Our Core Values',
            classname: 'mt-4 mt-lg-0',
            delay: '300',
            para: 'Accountability',
            para1: 'Commitment',
            para2: "Integrity",
            para3: "Teamwork",
            para4: 'Innovation'
        },
    ]
    const returnTitle = () => {
        return list.map(({para, para1, para2, para3, para4, delay, classname, title}, i) => {
            return <div className={`col-lg-4 ${classname}`} key={i}>
                <div className={classes.Box} data-aos="zoom-in-left" data-aos-delay={delay} data-aos-once='true'>
                    <h3 className={classes.Title}>
                        <Link href={`/about/vision`}>
                            <a>{title}</a>
                        </Link>
                    </h3>
                    <p>{para}</p>
                    <p>{para1 && para1}</p>   <p>{para2 && para2}</p>   <p>{para3 && para3}</p>
                    <p>{para4 && para4}</p>

                </div>
            </div>
        })

    }
    return (
        <div className={`container `}>
            <section>
                <div className="section-title" data-aos="zoom-out" data-aos-once='true'>
                    <h2>Mission, Vision and Core Values</h2>
                    <p>our guiding principles are</p>
                </div>

                <div className="row">
                    {returnTitle()}
                </div>
            </section>
        </div>
    );
};

export default CoreValues;
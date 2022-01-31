import styles from '../../styles/Util.module.css'
import Column from "./Column";

const CoreValues = () => {
    const list = [
        {
            title: 'Our Vision',
            delay: '0',
            classname: '',
            link: '/about/vision',
            para: ' A facility of choice in health care provision'
        },
        {
            title: 'Our Mission',
            delay: '200',
            link: '/about/mission',
            classname: 'mt-4 mt-md-0',
            para: 'To provide quality preventive,\n' +
                '                                curative and rehabilitative health care services.'
        },
        {
            title: 'Our Core Values',
            classname: 'mt-4 mt-lg-0',
            link: '/about/core-values',
            delay: '300',
            para: 'Accountability,Commitment,Integrity,\n  Teamwork, Innovation',
            para1: 'Commitment',
            para2: "Integrity",
            para3: "Teamwork",
            para4: 'Innovation'
        },
    ]
    const renderList = () => {
        return list.map((item, index) => {
            return <Column
                to={item.link}
                title={item.title}
                delay={item.delay}
                classname={`col-lg-4 col-md-6 ${item.classname}`}
                key={index} btnCaption='See more'>
                <li>{item.para}</li>
            </Column>

        })

    }


    return (
            <section className={`${styles.Section} `}>
                <div className="container">
                    <div className={styles.SectionTitle} data-aos="zoom-out" data-aos-once='true'>
                        <h2>Mission, Vision and Core Values</h2>
                    </div>

                    <div className="row">
                        {renderList()}
                    </div>
                </div>
            </section>

    );
};

export default CoreValues;
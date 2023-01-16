import Link from "next/link";

const CoreValues = ({ifSingle}) => {
    const list = [
        {
            title: 'Our Vision',
            classname: '',
            link: '/about/vision',
            para: ' A facility of choice in health care provision'
        },
        {
            title: 'Our Mission',
            link: '/about/mission',
            classname: 'mt-4 mt-md-0',
            para: 'To provide quality preventive,\n' +
                '                                curative and rehabilitative health care services.'
        },
        {
            title: 'Our Core Values',
            classname: 'mt-4 mt-lg-0',
            link: '/about/core-values',
            para: 'Accountability,Commitment,Integrity, Teamwork, Innovation',
            para1: 'Commitment',
            para2: "Integrity",
            para3: "Teamwork",
            para4: 'Innovation'
        },
    ]
    const renderList = () => {
        return list.map((item, index) => {
            return <div key={index} className="col-xl-4 col-md-6 d-flex align-items-stretch  " data-aos="zoom-in"
                        data-aos-delay={`${(1 + index) * 100}`}>
                <div className="icon-box  w-100">
                    <h4><Link href='/about-us/guiding-principles'>{item.title}</Link></h4>
                    <p>{item.para}</p>
                </div>
            </div>

        })

    }


    return (
        <section id="services" className="services section-bg">
            <div className="container" data-aos="fade-up">

                <div className="section-title">
                    <h2>Our guiding principles</h2>

                </div>

                <div className="row">
                    {renderList()}
                </div>
            </div>
        </section>

    );
};

export default CoreValues;
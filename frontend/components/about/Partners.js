import classes from '../../styles/Partners.module.css'
import Link from "next/link";


const Partners = () => {
    const list = [

        {
            name: 'NHIF and community based organizations (CBOs).',
            src: '/partners/nhif.jpg',
            website: 'http://www.nhif.or.ke/healthinsurance/'
        },
        {name: 'MOH', src: '/partners/moh.png', website: 'https://www.moh.gov.sg/'},
        {name: 'KEMRI/Welcome Trust', src: '/partners/kemri.png', website: 'https://kemri-wellcome.org/'},
        {name: 'KMTC', src: '/partners/kmtc.jpg', website: 'https://kmtc.ac.ke/'},
        {
            name: 'Masinde Muliro University Of Science And Technology',
            src: '/partners/mmust.png',
            website: 'https://www.mmust.ac.ke/'
        },
        {name: 'JKUAT', src: '/partners/jkuat.jpg', website: 'https://www.jkuat.ac.ke/'},
        {name: 'The ICT Authority (ICTA)', src: '/partners/icta.png', website: 'https://icta.go.ke/'},
        {name: 'Mozzart bet', src: '/partners/mozzart.jpg', website: 'https://www.mozzartbet.co.ke/en'},
        {name: 'Moi University', src: '/partners/mu.png', website: 'https://www.mu.ac.ke/index.php/en/'},
        {name: 'Maseno University', src: '/partners/msu.jpg', website: 'https://www.maseno.ac.ke',},
    ]


    return <section>
        <div className="container" data-aos="fade-up">
            <div className='section-title'>
                <h2>Our Partners</h2>
            </div>
            <div className={`row no-gutters ${classes.Wrap} clearfix`} data-aos="fade-up" data-aos-delay="100"
                 data-aos-once='true'>
                {list.map((img, i) => {
                    return <div className="col-lg-3 col-md-4 col-6" key={i}>
                        <div className={classes.Logo}>
                            <Link href={img.website}>
                                <img src={img.src} className="img-fluid" alt={img.name}/>
                            </Link>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </section>;
};

export default Partners;
import classes from '../../styles/Partners.module.css';
import Link from "next/link";
import Image from "next/image";

const Partners = () => {
    const list = [
        {
            name: 'County Government of Vihiga', src: '/logo/logo.png', website: 'https://vihiga.go.ke/', width: 100,
            height: 55
        },
        {
            name: 'NHIF and community based organizations (CBOs).',
            src: '/partners/nhif.jpg',
            website: 'http://www.nhif.or.ke/healthinsurance/', width: 100,
            height: 100
        },
        {
            name: 'MOH', src: '/partners/moh.png', website: 'https://www.moh.gov.sg/', width: 100,
            height: 70
        },
        {
            name: 'KEMRI/Welcome Trust', src: '/partners/kemri.png', website: 'https://kemri-wellcome.org/', width: 100,
            height: 50
        },
        {
            name: 'KMTC', src: '/partners/kmtc.jpg', website: 'https://kmtc.ac.ke/', width: 100,
            height: 100
        },
        {
            name: 'Kaimosi Friends University',
            src: '/partners/kafu.jpg',
            website: 'https://kafu.ac.ke/',
            width: 100,
            height: 100
        },

        {
            name: 'The ICT Authority (ICTA)', src: '/partners/icta.png', website: 'https://icta.go.ke/', width: 120,
            height: 80
        },
        {
            name: 'Mozzart bet', src: '/partners/mozzart.jpg', website: 'https://www.mozzartbet.co.ke/en', width: 70,
            height: 70
        },
        {
            name: 'Moi University', src: '/partners/mu.png', website: 'https://www.mu.ac.ke/index.php/en/', width: 90,
            height: 90
        },
        {
            name: 'Maseno University', src: '/partners/msu.jpg', website: 'https://www.maseno.ac.ke', width: 80,
            height: 90
        },
        {
            name: 'Makl', src: '/partners/makl.png', website: 'https://makl.co.ke/', width: 100,
            height: 60
        },
    ];

    return (
        <section className={`${classes.Section}`}>
            <div className="container" data-aos="fade-up">
                <div className={`row no-gutters ${classes.Wrap} clearfix`} data-aos="fade-up" data-aos-delay="100"
                     data-aos-once='true'>
                    {list.map((img, i) => (
                        <div className="col-lg-3 col-md-4 col-6" key={i}>
                            <div className={classes.Logo}>
                                <Link href={img.website} passHref>
                                    <a>
                                        <Image src={img.src} className="img-fluid" alt={img.name} width={img.width} height={img.height} />
                                    </a>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;

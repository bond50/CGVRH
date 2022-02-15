import classes from '../../styles/Partners.module.css'
import styles from '../../styles/AboutContainer.module.css'


const Partners = () => {
    const list = [

        {name: 'NHIF and community based organizations (CBOs).', src: '/partners/nhif.jpg'},
        {name: 'MOH', src: '/partners/moh.png'},
        {name: 'KEMRI/Welcome Trust', src: '/partners/kemri.png'},
        {name: 'KMTC', src: '/partners/kmtc.jpg'},
        {name: 'Masinde Muliro University Of Science And Technology', src: '/partners/mmust.png'},
        {name: 'JKUAT', src: '/partners/jkuat.jpg'},
        {name: 'The ICT Authority (ICTA)', src: '/partners/icta.png'},
        {name: 'Mozzart bet', src: '/partners/mozzart.jpg'},
        {name: 'Moi University', src: '/partners/mu.png'},
        {name: 'Maseno University', src: '/partners/msu.jpg',},
    ]


    return <section className={styles.Section}>
        <div className="container" data-aos="fade-up" data-aos-once='true'>
            <div className={styles.SectionTitle}>
                <h2>Our Partners</h2>
            </div>
            <div className={`row no-gutters ${classes.Wrap} clearfix`} data-aos="fade-up" data-aos-delay="100"
                 data-aos-once='true'>
                {list.map((img, i) => {
                    return <div className="col-lg-3 col-md-4 col-6">
                        <div className={classes.Logo}>
                            <img src={img.src} className="img-fluid" alt={img.name}/>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </section>;
};

export default Partners;
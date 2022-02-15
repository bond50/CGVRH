import styles from '../../styles/Util.module.css'


const Column = ({children, classname, title, delay}) => {
    return (
        <div className={`${classname}`}>
            <div className={styles.Box} data-aos="fade-up" data-aos-delay={delay} data-aos-once='true'>
                <h3 className={styles.Title}>
                    {title}
                </h3>
                <ul>
                    {children}
                </ul>
                {/*<div className={styles.Btn}>*/}
                {/*    <Link href={`/services/${slug}`}>*/}
                {/*        <a className={styles.BtnClick}>{btnCaption}</a>*/}
                {/*    </Link>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Column;
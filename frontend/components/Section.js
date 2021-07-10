import styles from '../styles/Util.module.css'

const Section = ({customClassName, children}) => (
    <section className={`${styles.Section} ${customClassName}`}>
        {children}
    </section>
);

export default Section;
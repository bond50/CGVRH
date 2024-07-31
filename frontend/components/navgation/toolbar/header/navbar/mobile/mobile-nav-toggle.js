import { Icon } from "@iconify/react";
import styles from '../../../../../../styles/MobileNavToggle.module.css';

const MobileNavToggle = ({ clicked, isOpen }) => {
    return (
        <button
            className={`${styles.MobileNavToggle} ${isOpen ? styles.open : ''}`}
            onClick={clicked}
        >
            <Icon icon={isOpen ? "material-symbols:arrow-back" : "ph:list-light"} />
            {isOpen && <span className={styles.MobileNavToggleText}>Menu</span>}
        </button>
    );
};

export default MobileNavToggle;

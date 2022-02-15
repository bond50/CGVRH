import {useState} from 'react';
import classes from '../../styles/Accordion.module.css'

const Accordion = ({title, children}) => {

    const [isOpen, setOpen] = useState(false)
    return (
        <div className={classes.accordionWrapper}>
            <div
                className={`${classes.accordionTitle} ${isOpen ? `${classes.open}` : ""}`}
                onClick={() => setOpen(!isOpen)}
            >
                {title}
            </div>
            <div className={`${classes.accordionItem} ${!isOpen ? `${classes.collapsed}` : ""}`}>
                <div className={classes.accordionContent}>{children}</div>
            </div>
        </div>
    )
}

export default Accordion
import React, { useState } from 'react';
import BootstrapAccordion from 'react-bootstrap/Accordion';
import styles from '../../styles/Accordion.module.css';

const Accordion = ({ list }) => {
    const [activeKey, setActiveKey] = useState('1'); // Initialize with the eventKey of the first item

    const handleAccordionToggle = (eventKey) => {
        setActiveKey(activeKey === eventKey ? null : eventKey);
    };

    return (
        <div className={styles.accordionList}>
            {list.map((item) => (
                <BootstrapAccordion
                    key={item.eventKey}
                    activeKey={activeKey}
                    onSelect={(eventKey) => handleAccordionToggle(eventKey)}
                >
                    <BootstrapAccordion.Item
                        eventKey={item.eventKey}
                       className={`accordion-item ${styles.accordionItem}`}
                    >
                        <BootstrapAccordion.Header className={`accordion-header ${styles.accordionHeader}`}>
                            <h3>
                                <span>{`0${item.eventKey}`}</span>
                                {item.title}
                            </h3>
                        </BootstrapAccordion.Header>
                        <BootstrapAccordion.Body className={`accordion-body ${styles.accordionBody}`}>
                            {item.comp}
                        </BootstrapAccordion.Body>
                    </BootstrapAccordion.Item>
                </BootstrapAccordion>
            ))}
        </div>
    );
};

export default Accordion;

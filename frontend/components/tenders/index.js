import React, { useState } from 'react';
import styles from '../../styles/Tender.module.css';
import Link from "next/link";
import dayjs from 'dayjs';

const TendersPage = ({ files }) => {
    const [selectedCategory, setSelectedCategory] = useState('open'); // Initial category

    const filteredTenders = files.filter((tender) => {
        switch (selectedCategory) {
            case 'open':
                return tender.isOpen;
            case 'closed':
                return tender.isClosed;
            case 'archived':
                return tender.isArchived;
            case 'awarded':
                return tender.isAwarded;
            default:
                return true;
        }
    });

    const filterOptions = [
        { label: 'Open Tenders', category: 'open' },
        { label: 'Closed Tenders', category: 'closed' },
        { label: 'Archived Tenders', category: 'archived' },
        { label: 'Awarded Tenders', category: 'awarded' },
    ];

    return (
        <section className={styles.section}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 d-flex justify-content-center">
                        <ul className={styles.filters}>
                            {filterOptions.map((option) => (
                                <li
                                    key={option.category}
                                    className={selectedCategory === option.category ? styles.active : ''}
                                    onClick={() => setSelectedCategory(option.category)}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={`d-none d-lg-block ${styles['tender-table']}`}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Tender Name</th>
                                <th>Tender Number</th>
                                <th>Open Date</th>
                                <th>Close Date</th>
                                <th>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTenders.map((tender) => {
                                const formattedOpenDate = dayjs(tender.openDate).format('MMMM D, YYYY h:mm A');
                                const formattedCloseDate = dayjs(tender.closeDate).format('MMMM D, YYYY h:mm A');
                                return (
                                    <tr key={tender._id}>
                                        <td>{tender.title}</td>
                                        <td>{tender.tenderNumber}</td>
                                        <td>{formattedOpenDate}</td>
                                        <td>{formattedCloseDate}</td>
                                        <td>
                                            <Link href={tender.filePath}>
                                                <a className={styles.btn}>Download</a>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="d-lg-none">
                    {filteredTenders.map((tender) => {
                        const formattedOpenDate = dayjs(tender.openDate).format('MMMM D, YYYY h:mm A');
                        const formattedCloseDate = dayjs(tender.closeDate).format('MMMM D, YYYY h:mm A');
                        return (
                            <div key={tender._id} className={`card mb-4 ${styles['card-wrapper']}`}>
                                <div className="card-body">
                                    <h5 className="card-title">{tender.title}</h5>
                                    <p className="card-text"><span>Tender Number</span>: {tender.tenderNumber}</p>
                                    <p className="card-text"><span>Open Date</span>: {formattedOpenDate}</p>
                                    <p className="card-text"><span>Close Date</span>: {formattedCloseDate}</p>
                                    <Link href={tender.filePath}>
                                        <a className={styles.btn}>Download</a>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TendersPage;

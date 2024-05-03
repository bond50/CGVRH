import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
import { API } from "../../config";

const CertificateVerification = () => {
    const [certificate, setCertificate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const verifyCertificate = async (id) => {
        try {
            const response = await axios.get(`${API}/certificates/verify/${id}`);
            setCertificate(response.data.certificate);
            setLoading(false);
        } catch (error) {
            setError(error.response ? error.response.data.error : "Network error");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (router.query.id) {
            verifyCertificate(router.query.id);
        }
    }, [router.query.id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section className='section-bg'>
            {certificate ? (
                <div className='container'>
                    <div className="section-title">
                        <h1>Certificate verification page</h1>
                    </div>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <th scope="row">Issued by</th>
                                <td>{certificate.facilityName}</td>
                            </tr>
                            <tr>
                                <th scope="row">Approved by</th>
                                <td>{certificate.facilityIncharge}</td>
                            </tr>
                            <tr>
                                <th scope="row">Reason</th>
                                <td>{certificate.projectTitle}</td>
                            </tr>
                            <tr>
                                <th scope="row">Date of Issue</th>
                                <td>{new Date(certificate.createdAt).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <th scope="row">Serial Number</th>
                                <td>{certificate.serialNumber}</td>
                            </tr>
                            <tr>
                                <th scope="row">Status</th>
                                <td>{certificate.valid ? <span className="text-success">Valid</span> : <span className="text-danger">Invalid</span>}</td>
                            </tr>
                        </tbody>
                    </table>
                    {certificate.valid && (
                        <p className="alert alert-success text-center">
                            Congratulations! This certificate is valid.
                        </p>
                    )}
                </div>
            ) : (
                <p className="alert alert-danger text-center">
                    Certificate not found or is no longer valid.
                </p>
            )}
        </section>
    );
};

export default CertificateVerification;

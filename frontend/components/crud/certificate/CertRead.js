// components/CertificateRead.js
import React, { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { getCookie, isAuth } from '../../../actions/auth';
import { removeCertificate } from '../../../actions/certificate';
import Alert from "../../messages/Alert";
import { API } from "../../../config";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const fetcher = (url, token) => fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
}).then(res => res.json());

const CertificateRead = ({ username }) => {
    const token = getCookie('token');
    const [message, setMessage] = useState('');

    const { data: certificates, error, mutate } = useSWR(
        () => username ? [`${API}/certificates/${username}`, token] : [`${API}/certificates`, token],
        fetcher
    );

    if (error) setMessage(error.message);

    const deleteCertificate = async (id) => {
        try {
            const data = await removeCertificate(id, token);
            if (data.error) {
                setMessage(data.error);
            } else {
                setMessage(data.message);
                mutate(); // revalidate the data
            }
        } catch (error) {
            setMessage(error.response?.data?.error || "Failed to delete certificate.");
        }
    };

    const deleteConfirm = id => {
        const answer = window.confirm('Are you sure you want to delete this certificate?');
        if (answer) {
            deleteCertificate(id);
        }
    };

    const showUpdateButton = certificate => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/certificate/${certificate._id}`}>
                    <a className="btn mx-3 btn-sm btn-warning">Update</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                <Link href={`/admin2/crud/certificate/${certificate._id}`}>
                    <a className="mx-3 btn btn-sm btn-warning">Update</a>
                </Link>
            );
        }
    };

    const showAllCertificates = () => {
        if (!certificates) return <p>Loading...</p>;
        return certificates.map((certificate, i) => (
            <div key={i} className="pb-5">
                <h6>{certificate.projectTitle}</h6>
                <p className="mark">
                    Created by {certificate.createdBy?.name} | Published on {dayjs(certificate.updatedAt).fromNow()}
                </p>
                <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(certificate._id)}>
                    Delete
                </button>
                {showUpdateButton(certificate)}
                <button className="btn btn-sm btn-secondary" onClick={() => viewCertificate(certificate._id)}>
                    View PDF
                </button>
            </div>
        ));
    };

    const viewCertificate = id => {
        window.open(`${API}/certificate/${id}/pdf`, '_blank');
    };

    return (
        <div className="row">
            <div className="col-md-8">
                <h3>Certificates</h3>
                {showAllCertificates()}
                {message && <Alert msg={message} label='Error' type='danger' />}
            </div>
        </div>
    );
};

export default CertificateRead;

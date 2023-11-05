import React, {useEffect, useState} from 'react';
import {deleteTender, fetchTenderList} from "../../actions/tender";
import {getCookie, isAuth} from "../../actions/auth";
import {removeBlog} from "../../actions/tender";
import Link from "next/link";
import moment from "moment/moment";
import Alert from "../messages/Alert";


const TenderRead = () => {
    const [tenders, setTenders] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const token = getCookie('token');

    useEffect(() => {
        loadTenders();
    }, []);

    const loadTenders = () => {
        fetchTenderList().then(data => {
            setTenders(data)
        });
    };


    const removeTender = id => {
        setLoading(true)
        deleteTender(id, token)
            .then(response => {
                setMessage(response.message);
                loadTenders()
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(false)
            });
    };

    const deleteConfirm = id => {
        let answer = window.confirm('Are you sure you want to delete this tender?');
        if (answer) {
            removeTender(id);
        }
    };


    const showUpdateButton = tender => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/${tender.slug}`}>
                    <a className="btn mx-3 btn-sm btn-warning">Update</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                <Link href={`/admin2/crud/tenders/${tender._id}`}>
                    <a className="mx-3 btn btn-sm btn-warning">Update</a>
                </Link>
            );
        }
    };

    const showAllTenders = () => {
        return tenders.map((tender, i) => {
            return (
                <div key={i} className="pb-5">
                    <h6>{tender.title}</h6>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(tender._id)}>
                        Delete
                    </button>
                    {showUpdateButton(tender)}
                </div>
            );
        });
    };


    return (
        <div className="row">
            <div className="col-md-8">
                {showAllTenders()}
                {loading && <Alert
                    msg='Please be patient as we process your request.The process might take a while depending on your internet connection speed'
                    label='Info' type='info'/>}
                {message && <Alert msg={message} label='Success' type='success'/>}
            </div>
        </div>
    );
};

export default TenderRead;
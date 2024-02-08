import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {getCookie} from '../../actions/auth';
import {listProjects, removeProject} from '../../actions/projects';
import moment from 'moment';
import Alert from "../messages/Alert";

const ProjectRead = () => {
    const [projects, setProjects] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const token = getCookie('token');

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = () => {

        listProjects().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProjects(data);
            }
        });
    };

    const deletePage = slug => {
        setLoading(true)
        removeProject(slug, token).then(data => {
            if (data.error) {
                setLoading(false)
                console.log(data.error);
            } else {
                setMessage(data.message);
                setLoading(false)
                loadProjects();
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this project?');
        if (answer) {
            deletePage(slug);
        }
    };

    const showUpdateButton = page => {
        return (
            <Link href={`/admin2/crud/projects/${page.slug}`}>
                <a className="mx-3 btn btn-sm btn-warning">Update</a>
            </Link>
        );
    };

    const showAllPages = () => {
        return projects.map((pg, i) => {
            return (
                <div key={i} className="pb-5">
                    <h6>{pg.title}</h6>
                    <p className="mark">
                        Written by {pg.postedBy.name} | Published on {moment(pg.updatedAt).fromNow()}
                    </p>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(pg.slug)}>
                        Delete
                    </button>
                    {showUpdateButton(pg)}
                </div>
            );
        });
    };


    return (
        <div className="row">
            <div className="col-md-8">
                <h3>Projects</h3>
                {showAllPages()}
                {loading && <Alert
                    msg='Please be patient as we process your request.The process might take a while depending on your internet connection speed'
                    label='Info' type='info'/>}
                {message && <Alert msg={message} label='Success' type='success'/>}
            </div>
        </div>

    );
};

export default ProjectRead;
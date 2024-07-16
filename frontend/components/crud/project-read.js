import Link from 'next/link';
import React, { useState } from 'react';
import useSWR from 'swr';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Alert from "../messages/Alert";
import {fetcher} from "../../axios/axios";

dayjs.extend(relativeTime);

const ProjectRead = () => {
    const [message, setMessage] = useState('');
    const { data: projects, error, mutate } = useSWR('/projects', fetcher);

    const deleteProject = async (slug) => {
        try {
            const response = await fetcher(`/project/${slug}`, { method: 'DELETE' });
            setMessage(response.message);
            mutate(); // Revalidate the SWR cache
        } catch (err) {
            setMessage(err.response?.data?.error || "Failed to delete project.");
        }
    };

    const deleteConfirm = slug => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            deleteProject(slug);
        }
    };

    const showUpdateButton = project => (
        <Link href={`/admin2/crud/projects/${project.slug}`}>
            <a className="mx-3 btn btn-sm btn-warning">Update</a>
        </Link>
    );

    const showAllProjects = () => (
        projects?.map((project, i) => (
            <div key={i} className="pb-5">
                <h6>{project.title}</h6>
                <p className="mark">
                    Written by {project.postedBy.name} | Published {dayjs(project.updatedAt).fromNow()}
                </p>
                <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(project.slug)}>
                    Delete
                </button>
                {showUpdateButton(project)}
            </div>
        ))
    );

    if (error) return <Alert msg='Failed to load projects.' label='Error' type='danger' />;
    if (!projects) return <div>Loading...</div>;

    return (
        <div className="row">
            <div className="col-md-8">
                <h3>Projects</h3>
                {showAllProjects()}
                {message && <Alert msg={message} label='Success' type='success' />}
            </div>
        </div>
    );
};

export default ProjectRead;

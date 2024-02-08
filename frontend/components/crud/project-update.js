import React, {useState, useEffect} from 'react';
import ProjectCreateForm from "../reusables/forms/project-create-form";
import Alert from "../messages/Alert";
import FileUpload from "../FileUpload";
import {getProject, updateProject} from "../../actions/projects";
import {useRouter} from "next/router";

const ProjectUpdate = ({match}) => {
    const [values, setValues] = useState({
        error: '',
        success: '',
        images: [],
        title: '',
        description: '',
        progress: ''
    });

    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);

    const {query} = useRouter()

    const {title, description, progress, error, success, images} = values;

    useEffect(() => {
        loadProject();
    }, []);

    const loadProject = async () => {
        try {
            const response = await getProject(query.slug);

            const {title, description, progress, body, images} = response;
            setValues({...values, title, description, progress, images});
            setBody(body);
        } catch (error) {
            // Handle error
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleBody = (value) => {
        setBody(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Create the project object to send to the backend
            const projectData = {
                title,
                description,
                progress,
                body,
                images
            };

            // Call the service function to update the project

            const response = await updateProject(query.slug, projectData);
            setLoading(false);
            setValues({
                ...values,
                success: response.message,
                error: ''
            });
        } catch (error) {
            console.log(error)
            setLoading(false);
            setValues({
                ...values,
                error: error.response.data.error
            });
        }
    };

    return (
        <div className='row'>
            <div className="col-md-8">
                <ProjectCreateForm
                    handleChange={handleChange}
                    handleBody={handleBody}
                    bodyValue={body}
                    loading={loading}
                    btnCapture={'Update'}
                    title={title}
                    progress={progress}
                    description={description}
                    onSubmit={handleSubmit}/>
                <div className="mb-3">
                    <br/>
                    <Alert msg={error} type="danger" label="Danger"/>
                    <Alert msg={success} label='Success' type='success'/>
                </div>
            </div>

            <div className="col-md-4">
                <FileUpload
                    values={values}
                    setValues={setValues}
                    folder={'projects'}
                    setLoading={setLoading}
                    loading={loading}/>
            </div>
        </div>
    );
};

export default ProjectUpdate;

import React, {useState} from 'react';
import ProjectCreateForm from "../reusables/forms/project-create-form";
import Alert from "../messages/Alert";
import FileUpload from "../FileUpload";
import {createProject} from "../../actions/projects";
// Import the service function

const ProjectCreate = () => {
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        images: [],
        title: '',
        description: '',
        progress: ''
    });

    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);

    const {title, description, progress, error, success, images} = values;

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

            // Call the service function to create the project
            const response = await createProject(projectData);

            setBody('')
             setLoading(false);
            setValues({
                ...values,
                success: response.message,
                error: '',
                sizeError: '',
                images: [],
                title: '',
                description: '',
                progress: '',
            });
        } catch (error) {
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
                    btnCapture={'Publish'}
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

export default ProjectCreate;

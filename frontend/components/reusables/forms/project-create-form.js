import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import {QuillFormats, QuillModules} from '../../../helpers/quill';

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});

const ProjectCreateForm = ({
                               onSubmit,
                               loading,
                               btnCapture,
                               handleChange,
                               handleBody,
                               bodyValue,
                               title,
                               progress,
                               description
                           }) => {
    const form = () => {
        return (
            <form onSubmit={onSubmit}>
                <div className="form-group mb-3">
                    <label className="text-muted">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        name='title'
                        required
                        onChange={handleChange}/>
                </div>
                <div className="form-group mb-3">
                    <label className="text-muted">Project description</label>
                    <input
                        type="text"
                        className="form-control"
                        value={description}
                        name='description'
                        onChange={handleChange}/>
                </div>
                <div className="form-group mb-3">
                    <label className="text-muted">Progress</label>
                    <select
                        className="form-control"
                        value={progress}
                        name='progress'
                        onChange={handleChange}>
                        <option value="" disabled>Please select</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="finished">Finished</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>


                <div className="form-group mb-3">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={bodyValue}
                        placeholder="Write something about the project.."
                        onChange={handleBody}
                    />
                </div>

                <div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </> : btnCapture}
                    </button>
                </div>
            </form>
        );
    };


    return (<>
            {form()}
        </>
    );
};

export default ProjectCreateForm;
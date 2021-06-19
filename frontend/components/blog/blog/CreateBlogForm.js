import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import {QuillFormats, QuillModules} from '../../../helpers/quill';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});

const BlogForm = ({onSubmit,btnCapture, handleChange, handleBody, bodyValue, titleValue}) => {
    const form = () => {
        return (
            <form onSubmit={onSubmit}>
                <div className="form-group mb-3">
                    <label className="text-muted">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={titleValue}
                        onChange={handleChange}/>
                </div>

                <div className="form-group mb-3">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={bodyValue}
                        placeholder="Write something amazing..."
                        onChange={handleBody}
                    />
                </div>

                <div>
                    <button type="submit" className="btn btn-primary">
                        {btnCapture}
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

export default BlogForm;
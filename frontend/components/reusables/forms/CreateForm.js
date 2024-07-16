import TinyMCEEditor from "../../TinyMCEEditor";

const CreateForm = ({ onSubmit, loading, btnCapture, handleChange, handleBody, bodyValue, titleValue, postToSocialMedia,  keywordsValue }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group mb-3">
                <label className="text-muted">Title</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={titleValue}
                    onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
                <TinyMCEEditor
                    value={bodyValue}
                    onEditorChange={handleBody}
                />
            </div>

            <div className="form-group mb-3">
                <label className="text-muted">Keywords separated by ,</label>
                <textarea

                    name="keywords"
                    className="form-control"
                    value={keywordsValue}
                    onChange={handleChange} />
            </div>

            <div className="form-group mb-3">
                <label className="text-muted">Post to Social Media</label>
                <input
                    type="checkbox"
                    name="postToSocialMedia"
                    checked={postToSocialMedia}
                    onChange={handleChange}
                />
            </div>

            <div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </>
                    ) : btnCapture}
                </button>
            </div>
        </form>
    );
};

export default CreateForm;

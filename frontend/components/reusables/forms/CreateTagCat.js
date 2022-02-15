const CreateTagCat = ({onSubmit, handleChange, name}) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group mb-3">
                <label className="text-muted">Category Name</label>
                <input
                    type="text"
                    className="form-control mb-3"
                    onChange={handleChange}
                    value={name}
                    required
                />
            </div>
            <div>
                <button type="submit" className="btn btn-primary mb-3">
                    Create
                </button>
            </div>
        </form>
    );
};

export default CreateTagCat;
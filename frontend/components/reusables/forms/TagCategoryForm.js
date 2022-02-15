const TagCategoryForm = ({clickSubmit, handleChange, value, label}) => {
    return (
        <form onSubmit={clickSubmit}>
            <div className="form-group mb-3">
                <label className="text-muted">{label}</label>
                <input type="text" className="form-control"
                       onChange={handleChange}
                       value={value}
                       required/>
            </div>
            <div>
                <button type="submit" className="btn btn-primary mb-3">
                    Create
                </button>
            </div>
        </form>
    );
};

export default TagCategoryForm;
const TagCatButton = ({name, doubleClicked}) => {
    return (
        <button
            onDoubleClick={doubleClicked}
            title="Double click to delete"
            className="btn btn-outline-primary mx-1 mt-3"
        >
            {name}
        </button>
    );
};

export default TagCatButton;
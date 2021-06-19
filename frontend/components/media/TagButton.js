const TagButton = ({name, handleSetTag}) => (
    <button onClick={handleSetTag}>
        {name.toUpperCase()}
    </button>


)
export default TagButton
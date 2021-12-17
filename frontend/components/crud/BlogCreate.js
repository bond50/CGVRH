import CreateComponent from "../reusables/forms/CreateComponent";
import useCreate from "../../hooks/useCreate";


const CreateBlog = () => {
    const {
        showCategories,
        showTags,
        handleBody,
        handleChange,
        publish,
        error,
        success,
        title,
        body
    } = useCreate('blog', 'categories', 'tags', 'blog')

    return (
        <CreateComponent
            handleBody={handleBody}
            handleChange={handleChange}
            onSubmit={publish}
            title={title}
            body={body}
            btnCapture='Create'
            categories={showCategories}
            tags={showTags}
            errorAlert={error}
            successAlert={success}/>
    );
};

export default CreateBlog
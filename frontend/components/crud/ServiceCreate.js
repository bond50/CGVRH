import CreateComponent from "../reusables/forms/CreateComponent";
import useCreate from "../../hooks/useCreate";
const ServiceCreate = () => {
    const {
        showCategories,
        showTags,
        handleBody,
        handleChange,
        publish,
        getFeaturedServices,
        error,
        success,
        title,
        body
    } = useCreate('service', 'service-categories', 'service-tags', 'service')

    return (
        <CreateComponent
            handleBody={handleBody}
            handleChange={handleChange}
            onSubmit={publish}
            title={title}
            featuredServices={getFeaturedServices}
            body={body}
            btnCapture='Create'
            categories={showCategories}
            tags={showTags}
            errorAlert={error}
            successAlert={success}/>
    );
};

export default ServiceCreate;
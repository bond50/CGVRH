import useUpload from "../../hooks/useUpload";
import UploadForm from "../reusables/forms/upload-form";

const Upload = () => {
    const {
        loading,
        successMessage,
        error,
        title,
        handleChange,
        multipleFileChange,
        uploadMultipleFiles
    } = useUpload('gallery')


    return (
        <UploadForm
            title={title}
            handleChange={handleChange}
            error={error}
            successMessage={successMessage}
            btnClick={uploadMultipleFiles}
            handleMultipleFile={multipleFileChange}
            loading={loading}/>
    );
};

export default Upload;
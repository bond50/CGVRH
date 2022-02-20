import Layout from "../../../hoc/admin/layout/layout";
import UploadFiles from "../../../components/crud/upload-files";
import Private from "../../../components/auth/Private";


const Upload = () => {
    return (
        <Layout>
            <Private>
                <UploadFiles/>
            </Private>
        </Layout>
    );
};

export default Upload;
import Layout from "../../../hoc/admin/layout/layout";
import UploadImages from "../../../components/crud/upload-images";
import Private from "../../../components/auth/Private";


const Upload = () => {

    return (
        <Layout>
            <Private>
                <UploadImages/>
            </Private>
        </Layout>
    );
};

export default Upload;
import DownloadList from "../../../components/media/download-list";
import Layout from "../../../hoc/Layout";
import {files} from "../../../dummy-data";


const Downloads = () => {
    return (
        <Layout>
            <DownloadList files={files}/>
        </Layout>
    );
};

export default Downloads;
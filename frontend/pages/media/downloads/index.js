import Layout from "../../../hoc/Layout";
import DownloadList from "../../../components/media/downloads/download-list";
import {getDownloads} from "../../../actions/fileupload";


const Downloads = ({files}) => {
    return (
        <Layout>
            <DownloadList files={files}/>
        </Layout>
    );
};


export const getServerSideProps = async () => {
    return getDownloads().then((data) => {
        console.log(data)
        if (data.error) {
            console.log(data.error);
        } else {
            console.log('err')
            return {
                props: {
                    files: data.files,
                },
            };
        }
    });
};
export default Downloads;
import Layout from "../../../hoc/Layout";
import DownloadList from "../../../components/media/downloads/download-list";
import {getDownloads} from "../../../actions/fileupload";


const Downloads = ({files}) => {
    if (!files || files.length === 0) {
        return <Layout>
            <div className="container m-4">
                <h2>No Files uploaded yet</h2>
            </div>
        </Layout>
    } else {
        return (
            <Layout>
                <DownloadList files={files}/>
            </Layout>
        );
    }
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
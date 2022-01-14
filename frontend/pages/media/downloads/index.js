import Layout from "../../../hoc/Layout";
import DownloadList from "../../../components/media/download-list";
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
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        props: {
          files: data.files,
        },
      };
    }
  });
};
export default Downloads;
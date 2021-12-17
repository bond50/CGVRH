import Layout from "../../../hoc/Layout";
import DownloadList from "../../../components/media/download-list";
import {listDocumentAndTags} from "../../../actions/document";
import Link from "next/link";
import TagFilters from "../../../components/reusables/TagFilters";


const Downloads = ({tags, documents,totalDocuments}) => {


    return (
        <Layout>
          <DownloadList files={documents}/>
        </Layout>
    );
};


export const getServerSideProps = async () => {
  return listDocumentAndTags().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        props: {
          documents: data.documents,
          totalDocuments: data.size,
          tags :data.tags,
        },
      };
    }
  });
};
export default Downloads;
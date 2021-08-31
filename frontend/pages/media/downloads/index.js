import Layout from "../../../hoc/Layout";
import useFetchMedia from "../../../hooks/useFetchMedia";
import DownloadList from "../../../components/media/download-list";


const Downloads = () => {
    const {transformedArray, source, setTag, activeTag} = useFetchMedia({folder: 'documents'})

    return (
        <Layout>
            <DownloadList filters={transformedArray}
                          handleTagClick={setTag}
                          active={activeTag}/>
        </Layout>
    );
};

export default Downloads;
import Layout from "../../../hoc/Layout";
import useFileDownloader from "../../../hooks/useFileDownloader";
import AboutContainer from "../../../components/reusables/AboutContainer";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilePdf} from '@fortawesome/free-solid-svg-icons'
import {getFilesFromLocal} from "../../../actions/gallery";


const Index = ({files}) => {
    const [downLoadFile, downloaderComponentUI] = useFileDownloader()

    const download = (file) => downLoadFile(file)

    const returnFiles = () => {
        return files.map(file => {
            return <div className='col-12 col-sm-6 col-md-4 ps-1'>
                <div className="card mb-1">
                    <a style={{cursor:'pointer',color:'#1977cc',fontSize:'10px'}}>
                        <div className="card-body  d-flex align-items-center">
                            <div className="icon p-0">
                                <FontAwesomeIcon icon={faFilePdf} style={{fontSize: '2.5rem'}}/>
                            </div>
                            <div className="pl-3 data">
                                <p className="m-0" onClick={()=>download(file)}>{file.fileName}</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        })
    }


    return (

        <Layout>
            <AboutContainer title='downloads'>
                <div className="row">
                    {returnFiles()}
                </div>
                {downloaderComponentUI}

            </AboutContainer>
        </Layout>
    );
};
export const  getServerSideProps = async (context)=>{
    const  files= await getFilesFromLocal()
    return{
        props:{
            files
        }
    }
}


export default Index;
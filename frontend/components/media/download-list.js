import useFileDownloader from "../../hooks/useFileDownloader";
import GeneralPageWrapper from "../../hoc/general-page-wrapper";
import classes from '../../styles/downloads.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilePdf} from '@fortawesome/free-solid-svg-icons'
import {Fragment} from "react";

const DownloadList = ({files}) => {
    const [downloadFile, downloaderComponentUI] = useFileDownloader();
    const download = (file) => downloadFile(file);


    function showDownloads() {
        return <div className="col text-center">


            {files.map((file, i) => {

                return <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                    <div className={classes.countBox}>
                        <i className="fas fa-user-md"/>
                        <span data-purecounter-start="0" data-purecounter-end="85" data-purecounter-duration="1"
                              className="purecounter"/>

                        <p><strong>Doctors</strong> consequuntur quae qui deca rode</p>
                        <a href="#">Find out more &raquo;</a>
                    </div>
                </div>
            })}


        </div>

    }

    return (
       <Fragment>
            <GeneralPageWrapper
            title={'downloads'}
            imgSrc={`https://res.cloudinary.com/dwtcilinl/image/upload/v1622297993/Gallery/yffhwkqackates3w0hte.png`}
            alt={'downloads'}
        >

            <div className="container" data-aos="fade-up">

                <div className="row no-gutters">

                    {files.map((f, i) => {
                        return <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch" key={i}>
                            <div className={classes.countBox}>
                                <i className={`fas fa-file-pdf ${classes.icon}`}/>
                                <span>size: 20mb</span>
                                <p><strong>{f.name}</strong> </p>
                                <button  onClick={() => download(f)}>Download  <i className="fas fa-download"/> </button>
                            </div>
                        </div>
                    })}


                </div>

            </div>

        </GeneralPageWrapper>
         {downloaderComponentUI}

       </Fragment>
    );
};

export default DownloadList;
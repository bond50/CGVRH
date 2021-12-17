import useFileDownloader from "../../hooks/useFileDownloader";
import GeneralPageWrapper from "../../hoc/general-page-wrapper";
import classes from '../../styles/downloads.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilePdf} from '@fortawesome/free-solid-svg-icons'
import {Fragment} from "react";

import Filters from "./gallery/Filters";

const DownloadList = ({files}) => {
    const [downloadFile, downloaderComponentUI] = useFileDownloader();
    const download = (file) => downloadFile(file);


    return (
        <Fragment>
            <GeneralPageWrapper imgSrc='/fallback/services.jpg' title='Downloads' title2='files to download'
                                alt='fallback image'>

                {/*    <div className='container'>*/}
                {/*    <div className="row no-gutters">*/}
                {/*        {files.map(f => {*/}
                {/*            return <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch" key={f._id}>*/}
                {/*                <div className={classes.countBox}>*/}
                {/*                    <i className={`fas fa-file-pdf ${classes.icon}`}/>*/}
                {/*                    <span>size: {f.fileSize}</span>*/}
                {/*                    /!*<p><strong>{f.title}</strong> </p>*!/*/}
                {/*                    <button  onClick={() => download(f)}>{f.title}  <i className="fas fa-download"/> </button>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        })}*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="container ">
                    <div className="row d-flex justify-content-center align-items-center">

                        {files.map(file => {
                            return <div className="col-8 ">
                                <ul className="list-group py-1">
                                    < div
                                       className="list-group-item list-group-item-action d-flex justify-content-between align-items-center download ">
                                        <div className="flex-column ">
                                            <p>{file.title}</p>
                                            <button type="button" className="btn btn-labeled btn-primary btn-sm " onClick={() => download(file)}>
                                                <span className="btn-label"><i
                                                    className="bi bi-download "/></span>Download now
                                            </button>

                                            <button type="button" className="btn btn-labeled btn-outline-primary btn-sm mx-1">
                                                <span className="btn-label"><i
                                                    className="bi bi-chevron-right "/></span> Uploaded on 24/09/21 | {file.fileSize}
                                            </button>

                                            <button type="button" className="btn btn-labeled btn-outline-primary btn-sm  ">
                                                <span className="btn-label"><i
                                                    className="bi bi-chevron-right "/></span> {file.fileSize}
                                            </button>


                                        </div>
                                        <div className='fas fa-file-pdf pt-4' style={{fontSize: '35px'}}>
                                        </div>
                                    </div>
                                </ul>
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
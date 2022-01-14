import useFileDownloader from "../../hooks/useFileDownloader";
import GeneralPageWrapper from "../../hoc/general-page-wrapper";
import classes from '../../styles/downloads.module.css'

import {Fragment} from "react";

import Filters from "./gallery/Filters";
import {fileTypes} from "../reusables/functions/fileTypes";

const DownloadList = ({files}) => {
    const [downloadFile, downloaderComponentUI] = useFileDownloader();
    const download = (file) => downloadFile(file);


    function handleDownload(file,id) {
         axios.get(file, {
            responseType: "blob",
        }).then(function (response) {

            const url = window.URL.createObjectURL(
                new Blob([response.data], {
                    type: response.headers["content-type"],
                })
            );

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", id);
            document.body.appendChild(link);
            link.click();

        });
    }

    return (
        <Fragment>
            <GeneralPageWrapper
                imgSrc='/fallback/services.jpg'
                title='Downloads'
                alt='fallback image' className={classes.downloads}>
                <div className={classes.DownloadWrapper}>
                    {files.map(file => {
                        console.log(file)
                        return <div className={classes.Wrapper} key={file._id}>
                            <div className={classes.Header}>
                                {fileTypes(file.fileType)}
                                <span>{file.title}</span>
                            </div>
                            <div className="d-flex align-items-center flex-column m-2">
                                <div className={classes.Date}>Uploaded on <span>{moment(file.createdAt).format('llll')}</span></div>
                                <div className={classes.Size}>File size :<span>{file.fileSize}</span></div>
                            </div>
                            <div className={`${classes.Btn} text-center`} onClick={()=>handleDownload(file.filePath,file._id)}>
                                <span className="align-middle">Download</span>
                            </div>
                        </div>
                    })}
                </div>


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

                {/*<div className="container ">*/}
                {/*    <div className="row">*/}
                {/*        {files.map(file => {*/}
                {/*            return <div className="col-8 " key={file._id}>*/}
                {/*                <ul className="list-group py-1">*/}
                {/*                    <div*/}
                {/*                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center download ">*/}
                {/*                        <div className="flex-column ">*/}
                {/*                            <p>{file.title}</p>*/}
                {/*                            <button type="button" className="btn btn-labeled btn-primary btn-sm "*/}
                {/*                                    onClick={() => download(file)}>*/}
                {/*                                <span className="btn-label"><i*/}
                {/*                                    className="bi bi-download "/></span>Download now*/}
                {/*                            </button>*/}

                {/*                            <button type="button"*/}
                {/*                                    className="btn btn-labeled btn-outline-primary btn-sm mx-1">*/}
                {/*                                <span className="btn-label"><i*/}
                {/*                                    className="bi bi-chevron-right "/></span> Uploaded on 24/09/21*/}
                {/*                                | {file.fileSize}*/}
                {/*                            </button>*/}

                {/*                            <button type="button"*/}
                {/*                                    className="btn btn-labeled btn-outline-primary btn-sm  ">*/}
                {/*                                <span className="btn-label"><i*/}
                {/*                                    className="bi bi-chevron-right "/></span> {file.fileSize}*/}
                {/*                            </button>*/}

                {/*                        </div>*/}
                {/*                        <div className='fas fa-file-pdf pt-4' style={{fontSize: '35px'}}>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </ul>*/}
                {/*            </div>*/}
                {/*        })}*/}

                {/*    </div>*/}
                {/*</div>*/}

            </GeneralPageWrapper>
            {downloaderComponentUI}
        </Fragment>
    );
};

export default DownloadList;

import React from 'react';
import {fileType} from "../reusables/functions/fileTypes";
import moment from "moment";
import Axios from "axios";
import axios from "axios";


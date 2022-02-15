import GeneralPageHeader from "../../hoc/general-page-header";
import classes from '../../styles/downloads.module.css'
import React, {Fragment} from 'react';
import moment from "moment";
import axios from "axios";

import {fileTypes} from "../reusables/functions/fileTypes";

const DownloadList = ({files}) => {

    function handleDownload(file, id) {
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

        }).catch(err => {
            console.log(err)
        });
    }

    return (
        <Fragment>

            <GeneralPageHeader
                title='Downloads'>
            </GeneralPageHeader>

            <section className={classes.Download}>


                <div className={classes.DownloadWrapper}>
                    {files.map(file => {
                        return <div className={classes.Wrapper} key={file._id}>
                            <div className={classes.Header}>
                                {fileTypes(file.fileType)}
                                <span>{file.title}</span>
                            </div>
                            <div className="d-flex align-items-center flex-column m-2">
                                <div className={classes.Date}>Uploaded
                                    on <span>{moment(file.createdAt).format('llll')}</span></div>
                                <div className={classes.Size}>File size :<span>{file.fileSize}</span></div>
                            </div>
                            <div className={`${classes.Btn} text-center`}
                                 onClick={() => handleDownload(file.filePath, file._id)}>
                                <span className="align-middle">Download</span>
                            </div>
                        </div>
                    })}
                </div>


            </section>


        </Fragment>


    );
};

export default DownloadList;




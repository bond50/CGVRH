import React, {useEffect, useState} from "react";
import Axios from "axios";
import {FILE_DOWNLOAD_API} from "../../config";
import DownloaderProgressBar from "../downloder/progress/DownloaderProgressBar";



const Download = ({filePath, fileName, removeFile}) => {

    const [downloadInfo, setDownloadInfo] = useState({
        progress: 0,
        completed: false,
        total: 0,
        loaded: 0,
    });

    useEffect(() => {
        const options = {
            onDownloadProgress: (progressEvent) => {
                const {loaded, total} = progressEvent;

                setDownloadInfo({
                    progress: Math.floor((loaded * 100) / total),
                    loaded,
                    total,
                    completed: false,
                });
            },
        };

        Axios.get(`${FILE_DOWNLOAD_API}/${filePath}`, {
            responseType: "blob",
            ...options,
        }).then(function (response) {


            const url = window.URL.createObjectURL(
                new Blob([response.data], {
                    type: response.headers["content-type"],
                })
            );

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();

            setDownloadInfo((info) => ({
                ...info,
                completed: true,
            }));

            setTimeout(() => {
                removeFile();
            }, 4000);
        });
    }, []);


    return (
        <DownloaderProgressBar downloadInfo={downloadInfo} fileName={fileName}/>
    );
};
export default Download



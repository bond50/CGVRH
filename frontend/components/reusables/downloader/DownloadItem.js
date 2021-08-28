import React, {useEffect, useState} from 'react';
import Axios from 'axios'
import ProgressBar from 'react-bootstrap/ProgressBar'


const DownloadItem = ({name, file, filename, removeFile,_id}) => {

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

        Axios.get(file, {
            responseType: "blob",
            ...options,
        }).then(function (response) {
            console.log(response);

            const url = window.URL.createObjectURL(
                new Blob([response.data], {
                    type: response.headers["content-type"],
                })
            );

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
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

    const formatBytes = (bytes) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-12 d-flex">
                    <div className="d-inline font-weight-bold text-truncate">{_id}</div>
                    <div className="d-inline mx-2">
                        <small>
                            {downloadInfo.loaded > 0 && (
                                <>
                                    <span className="text-success">{formatBytes(downloadInfo.loaded)}</span>
                                    / {formatBytes(downloadInfo.total)}
                                </>
                            )}
                            {downloadInfo.loaded === 0 && <>Initializing...</>}
                        </small>
                    </div>
                    <div className="d-inline mx-1 ms-auto">
                        {downloadInfo.completed && (
                            <span className="text-success">Completed <i className="bi bi-check-circle"/></span>
                        )}
                    </div>
                </div>
                <div className="col-12 mt-1">
                    <ProgressBar
                        variant="primary"
                        now={downloadInfo.progress}
                        striped={true}
                        label={`${downloadInfo.progress}%`}
                    />
                </div>
            </div>
        </li>
    )
}

export default DownloadItem;
import React from 'react';

const ProgressBarInfo = ({downloadInfo,fileName}) => {
    const formatBytes = (bytes) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return (
        <div className="col-12 d-flex">
            <div className="d-inline font-weight-bold text-truncate">{fileName}</div>
            <div className="d-inline ml-2">
                <small>
                    {downloadInfo.loaded > 0 && (<><span
                        className="text-success">{formatBytes(downloadInfo.loaded)}
                  </span>/{formatBytes(downloadInfo.total)}</>)}
                    {downloadInfo.loaded === 0 && <>Initializing...</>}
                </small>
            </div>
            <div className="d-inline ml-4 ml-auto">
                {downloadInfo.completed && (
                    <span className="text-success">Completed <i className='bi bi-check-circle-fill'/></span>
                )}
            </div>
        </div>
    );
};

export default ProgressBarInfo;
import DownloadItem from "./DownloadItem";
import classes from '../../../styles/downloader.module.css'

export const Downloader = ({files = [], remove}) => {
    return (
        <div className={classes.downloader}>
            <div className="card">
                <div className={`card-header ${classes.cardHeader}`}>File Downloader</div>
                <ul className={`list-group list-group-flush ${classes.listGroup}`}>
                    {files.map(file  => {
                        return (
                            <DownloadItem
                                key={file.publicId}
                                removeFile={() => remove(file.downloadId)}
                                {...file}
                            />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
import DownloadbarInfor from "./ProggressBarInfo";
import MyProgressBar from "./ProgressBar";

const DownloaderProgressBar = ({fileName,downloadInfo}) => {
    return (
        <li className="list-group-item">
            <div className="row">
                <DownloadbarInfor fileName={fileName} downloadInfo={downloadInfo}/>
                <MyProgressBar downloadInfo={downloadInfo}/>
            </div>
        </li>
    );
};

export default DownloaderProgressBar;
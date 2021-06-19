import React from "react";
import {ProgressBar} from "react-bootstrap";

const MyProgressBar = ({downloadInfo}) => (
        <div className="col-12 mt-2">
            <ProgressBar
                variant="success"
                now={downloadInfo.progress}
                striped={true}
                label={`${downloadInfo.progress}%`}
            />
        </div>
    );

export default MyProgressBar;
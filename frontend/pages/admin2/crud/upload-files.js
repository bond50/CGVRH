import React from 'react';
import Admin from '../../../components/auth/Admin';
import UploadComponent from "../../../components/crud/Upload";
import Layout from "../../../hoc/admin/layout/layout";
import UploadForm from "../../../components/reusables/forms/upload-form";
import useUpload from "../../../hooks/useUpload";


const Upload = () => {
    const {
        loading,
        successMessage,
        error,
        title,
        handleChange,
        multipleFileChange,
        uploadMultipleFiles
    } = useUpload('documents')

    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8 text-muted">
                            <p>Files uploaded hear will appear under <strong>Downloads section</strong></p>
                            <p>Do not upload <strong>Media files </strong>here</p>
                            <em>Media files include :</em>
                            <ul className='small'>
                                <li>Photo file formats: JPEG, GIF, TIFF, BMP</li>
                                <li>Music file formats: AAC, MP3, WAV, WMA, DOLBY DIGITAL, DTS</li>
                                <li>Other available music file formats: AIFF, ASF, FLAC, ADPCM, DSD, LPCM, OGG</li>
                                <li>Video file formats: MPEG-1, MPEG-2, MPEG-4, AVI, MOV, AVCHD, H.264, H.265</li>
                                <li> Other available video formats: DivX and DivX HD, Xvid HD, MKV, RMVB, WMV9, TS/TP/M2T,</li>
                            </ul>
                        </div>
                        <div className="col-lg-8">
                            <UploadForm
                                title={title}
                                handleChange={handleChange}
                                error={error}
                                successMessage={successMessage}
                                btnClick={uploadMultipleFiles}
                                handleMultipleFile={multipleFileChange}
                                loading={loading}/>
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Upload;
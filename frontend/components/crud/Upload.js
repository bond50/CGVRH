import AboutContainer from "../reusables/AboutContainer";
import {useState} from 'react';
import axios from "axios";
import {API} from "../../config";
import Alert from "../messages/Alert";
import Button from "../reusables/ui/Button";


const Upload = () => {
    const [multipleFiles, setMultipleFiles] = useState('');
    const [folder, setFolder] = useState('gallery')
    const [values, setValues] = useState({
        successMessage: '',
        error: '',
        title: '',
        files: '',
        loading: false
    })


    const {successMessage, error, title, loading, formData} = values

    const UploadMultipleFiles = () => {
        setValues({...values, loading: true, error: ''})
        const formData = new FormData();
        formData.append('title', title);
        formData.append('folder', folder)
        for (const file of multipleFiles) {
            formData.append('files', file)
        }


        axios.post(`${API}/files-upload`, formData)
            .then(response => {
                setValues({
                    ...values,
                    successMessage: response.data.message,
                    loading: false,
                    title: '',
                })
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            })
            .catch((error) => {
                if (error.response) {
                    setValues({...values, error: error.response.data.error, loading: false})


                } else if (error.request) {
                    setValues({...values, error: error.request.data.error, loading: false})

                } else {
                    setValues({...values, loading: false})
                }
            });

    }


    const MultipleFileChange = e => {
        setMultipleFiles(e.target.files)
    };

    function handleChange(e) {
        setValues({folder: e.target.value});
        e.preventDefault();
    }

    let btnText = 'Upload'
    if (loading) {
        btnText = <><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/> Uploading...</>
    }

    const returnForm = () => {
        return (
            <form>
                <div className='mb-3'>
                    <Alert msg={successMessage} type="success" label="Success"/>
                    <Alert msg={error} type="danger" label="Danger"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Choose upload folder</span>
                    <select value={folder} required onChange={(e) => setFolder(e.target.value)}>
                        {/*<option value="documents">Documents</option>*/}
                        <option value="gallery">Gallery</option>
                    </select>
                </div>
                <div className="input-group mb-3">
                    <input
                        value={title}
                        required
                        onChange={(e) => setValues({title: e.target.value})}
                        type="text"
                        className="form-control" placeholder="Enter a tag/title for the file(s)"/>
                </div>

                <div className="input-group mb-3">
                    <input
                        required
                        className="form-control"
                        onChange={(e) => MultipleFileChange(e)}
                        type="file" multiple/>
                </div>
                <Button
                    clicked={() => UploadMultipleFiles()}
                    btnCapture={btnText}
                    loading={loading}/>
            </form>
        )
    }
    return (
        <>
            <div className='text-muted'>
                <p> You have selected <strong>{JSON.stringify(folder)} </strong>folder </p>
                <i>
                    <p>All images are uploaded to gallery folder</p>
                    <p>All documents eg pdf,word,excel are uploaded to documents folder folder</p>
                    <p>All videos are are uploaded to video folder folder</p>
                </i>
            </div>
            {returnForm()}
        </>

    );
};

export default Upload;
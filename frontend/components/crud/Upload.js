import AboutContainer from "../reusables/AboutContainer";
import {useState} from 'react';
import axios from "axios";
import {API} from "../../config";
import Alert from "../messages/Alert";
import Button from "../reusables/ui/Button";


const Upload = () => {
    const [multipleFiles, setMultipleFiles] = useState('');
    const [values, setValues] = useState({
        successMessage: '',
        error: '',
        title: '',
        formData: {},
        files: '',
        loading: false
    })

    const UploadMultipleFiles = () => {
        setValues({...values, loading: true, error: ''})
        const formData = new FormData();
        formData.append('title', title);
        for (const file of multipleFiles) {
            formData.append('files', file)
        }


        axios.post(`${API}/files-upload`, formData)
            .then(response => {
                setValues({...values, successMessage: response.data.message, loading: false, title: ''})
                setTimeout(() => {
                    window.location.reload()
                }, 5000)
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
    const {successMessage, error, title, loading,formData} = values


    let btnText = 'Upload'
    if (loading) {
        btnText = <><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/> Uploading...</>
    }

    const returnForm = () => {
        return (
            <form>
                <div className='mb-3'>
                    <Alert msg={successMessage} type="success" label="Success"/>
                    <Alert msg={error} type="danger" label="Dander"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Tag</span>

                    <select className="form-select" aria-label="Default select example">
                        <option selected>_</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>

                    <input
                        value={title}
                        required
                        onChange={(e) => setValues({title: e.target.value})}
                        type="text"
                        className="form-control" placeholder="Enter a tag/title for the file(s)"/>
                </div>

                <div className="mb-3">
                    <input
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
            {returnForm()}
        </>

    );
};

export default Upload;
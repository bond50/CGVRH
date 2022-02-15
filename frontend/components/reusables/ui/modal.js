import Modal from 'react-bootstrap/Modal'

function MyModal({bodyMessage, titleMessage, handleChanges, show, handleClose}) {
    return (
        <Modal show={show} onHide={handleClose}>
            <div className="modal-header">
                <h5 className="modal-title">{titleMessage}</h5>
                <button
                    onClick={handleClose}
                    type="button"
                    className="btn-close"
                    aria-label="Close"/>
            </div>
            <div className="modal-body">{bodyMessage}!</div>
            <div className="modal-footer">
                <button type="button"
                        className="btn btn-secondary"
                        onClick={handleClose}
                >Close
                </button>
                <button
                    onClick={handleChanges}
                    type="button"
                    className="btn btn-danger">Delete
                </button>
            </div>
        </Modal>
    );
}

export default MyModal


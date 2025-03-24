import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalUser = ({
    show,
    handleClose,
    userEditData,
    handleChangeUserEditData,
    handleSaveUserEdit,
}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            {/* tiêu đề */}
            <Modal.Header>
                <Modal.Title>Edit User Information</Modal.Title>
            </Modal.Header>
            {/* nội dung */}
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={userEditData.firstName}
                            onChange={handleChangeUserEditData}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={userEditData.lastName}
                            onChange={handleChangeUserEditData}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={userEditData.email}
                            onChange={handleChangeUserEditData}
                        />
                    </div>
                    <div className="form-group">
                        <label>Address:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={userEditData.address}
                            onChange={handleChangeUserEditData}
                        />
                    </div>
                </form>
            </Modal.Body>
            {/* Phần footer của modal */}
            <Modal.Footer>
                <button type="button" class="btn btn-secondary btn-sm" onClick={handleClose}>
                    Close
                </button>
                <button type="button" class="btn btn-primary btn-sm" onClick={handleSaveUserEdit}>
                    Save changes
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalUser;

import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { languages } from "../../utils/constant";
import "./UserRedux.scss";
import * as actions from "../../../src/store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { create } from "lodash";
import { createUser } from "../../../src/services/userServices";
import {
    getAllUsers,
    deleteUser,
    updateUser,
} from "../../services/userServices";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.editFormRef = React.createRef();
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: "",
            isOpen: false,
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            phoneNumber: "",
            gender: "",
            role: "",
            position: "",
            avatar: "",
            arrUsers: [],
            isEditing: false,
            userEditId: null,
        };
    }

    // Thêm hàm scroll
    scrollToEditForm = () => {
        this.editFormRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
    // gọi hàm bên redux
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        this.props.fetchAllUsers();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArr: arrGender,
                gender:
                    arrGender && arrGender.length > 0 ? arrGender[0].key : "",
            });
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: arrPosition,
                position:
                    arrPosition && arrPosition.length > 0
                        ? arrPosition[0].key
                        : "",
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : "",
            });
        }

        // Xử lý khi tạo user thành công hoặc thất bại
        if (prevProps.success !== this.props.success) {
            if (this.props.success && this.props.success.errCode === 0) {
                // Reset form
                this.setState({
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    address: "",
                    phoneNumber: "",
                    gender: this.state.genderArr[0]?.key || "",
                    role: this.state.roleArr[0]?.key || "",
                    position: this.state.positionArr[0]?.key || "",
                    avatar: "",
                    previewImgURL: "",
                });

                toast.success("Tạo người dùng thành công!");
                // Refresh danh sách users
                this.props.fetchAllUsers();
            }
        }

        // Xử lý khi có lỗi
        if (prevProps.error !== this.props.error && this.props.error) {
            if (this.props.error.errCode === 1) {
                toast.error(this.props.error.errMessage);
            }
        }
    }
    // khi cập nhập ảnh
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            // Validate file
            const validTypes = ["image/jpeg", "image/png", "image/gif"];
            const maxSize = 16 * 1024 * 1024; // 16MB

            if (!validTypes.includes(file.type)) {
                toast.error("Vui lòng chọn file ảnh (jpg, png, gif)");
                return;
            }

            if (file.size > maxSize) {
                toast.error("Kích thước ảnh tối đa 16MB");
                return;
            }

            try {
                const base64 = await this.getBase64(file);
                const objectUrl = URL.createObjectURL(file);

                this.setState({
                    previewImgURL: objectUrl,
                    avatar: base64,
                });
            } catch (error) {
                toast.error("Lỗi xử lý ảnh");
                console.error("Error:", error);
            }
        }
    };
    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    triggerFileInput = () => {
        document.getElementById("previewImg").click();
    };
    // hiển thị ảnh khi ấn vào
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({ isOpen: true });
    };
    // nhấn nút submit để tạo người dùng
    handleOnSubmit = () => {
        let isVaild = this.checkVaildateInput();
        if (isVaild === false) return;
        console.log("check", this.state);

        // console.log("check", email);
        console.log("check props", this.props);
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            position: this.state.position,
            roleId: this.state.role,
            image: this.state.avatar,
        });
        console.log("CHECK PROP", this.props);

        // alert(successMessage);
    };
    // kiểm tra người dùng đã nhập đủ thông tin chưa
    checkVaildateInput = () => {
        let isVaild = true;
        let errcheck = [
            "email",
            "password",
            "firstName",
            "lastName",
            "address",
            "phoneNumber",
            "gender",
            "role",
            "position",
            "avatar",
        ];
        const fieldNames = {
            email: "Email",
            password: "Mật khẩu",
            firstName: "Tên",
            lastName: "Họ",
            address: "Địa chỉ",
            phoneNumber: "Số điện thoại",
            gender: "Giới tính",
            role: "Vai trò",
            position: "Chức vụ",
            avatar: "Ảnh đại diện",
        };
        for (let i = 0; i < errcheck.length; i++) {
            let key = errcheck[i];
            let value = this.state[key];
            if (!value) {
                isVaild = false;
                toast.error(`Vui lòng nhập ${fieldNames[key]}`);
                break;
            }
        }
        return isVaild;
    };
    // lấy giá trị khi nhập vào ở các ô lưu vào state
    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState(
            {
                ...copyState,
            }
            // () => {
            //     console.log("anhtonton", this.state);
            // }
        );
    };

    // xóa người dùng

    handleDeleteUser = (user) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
            this.props.deleteUser({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
            });
        }
    };
    // set các giá trị vào state để sửa thông tin người dùng

    handleEditUser = (user) => {
        console.log("check User ", user);
        this.setState(
            {
                email: user.email,
                password: "********", // Thay đổi thành dấu *
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phonenumber,
                gender: user.gender,
                role: user.roleID,
                position: user.positionId,
                avatar: user.image,
                previewImgURL:
                    user.image && user.image.startsWith("data:image")
                        ? user.image
                        : user.image
                        ? `data:image/jpeg;base64,${user.image}`
                        : "",
                isEditing: true,
                userEditId: user.id,
            },
            () => {
                this.scrollToEditForm();
            },
            console.log(
                "check rolevs position",
                this.state.position,
                this.state.role,
                this.state.gender
            )
        );
    };

    // sửa thông tin người dùng

    handleSubmitEditUser = () => {
        if (!this.checkValidateEdit()) return;
        let {
            firstName,
            lastName,
            address,
            phoneNumber,
            gender,
            role,
            position,
            userEditId,
            avatar,
        } = this.state;
    // Tạo object data để gửi lên server
    const userData = {
        id: userEditId,
        firstName: firstName,
        lastName: lastName,
        address: address,
        phoneNumber: phoneNumber,
        gender: gender,        // Đảm bảo đúng format
        roleId: role,         // Đảm bảo đúng format
        positionId: position, // Đảm bảo đúng format
        image: avatar,
    };
    console.log('Sending update data:', userData);
    this.props.editUser(userData);

        // reset state sau khi edit

        // Reset form sau khi edit
        this.setState({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            phoneNumber: "",
            gender: this.state.genderArr[0]?.key || "",
            role: this.state.roleArr[0]?.key || "",
            position: this.state.positionArr[0]?.key || "",
            avatar: "",
            previewImgURL: "",
            isEditing: false,
            userEditId: null,
        });
    };

    // Thêm hàm validate cho edit
checkValidateEdit = () => {
    let isValid = true;
    const requiredFields = [
        'firstName',
        'lastName',
        'address',
        'phoneNumber',
        'gender',
        'role',
        'position'
    ];

    const fieldNames = {
        firstName: "Tên",
        lastName: "Họ",
        address: "Địa chỉ",
        phoneNumber: "Số điện thoại",
        gender: "Giới tính",
        role: "Vai trò",
        position: "Chức vụ"
    };

    for (let field of requiredFields) {
        if (!this.state[field]) {
            isValid = false;
            toast.error(`Vui lòng nhập ${fieldNames[field]}`);
            break;
        }
    }

    return isValid;
};
    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        let isLoading = this.props.isLoading;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let {
            email,
            password,
            firstName,
            lastName,
            address,
            phoneNumber,
            gender,
            role,
            position,
            avatar,
        } = this.state;
        return (
            <div className="manage-user">
                <div className="title">
                    <FormattedMessage id="manage-user.title" />
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="text-center">
                            {isLoading === true ? "Loading infomation" : ""}
                        </div>
                        <div ref={this.editFormRef} className="row">
                            <div className="mb-3">
                                <FormattedMessage id="manage-user.add-new-user" />
                            </div>
                            <form>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <label
                                            htmlFor="email"
                                            className="form-label"
                                        >
                                            <FormattedMessage id="manage-user.email" />
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(event) =>
                                                this.onChangeInput(
                                                    event,
                                                    "email"
                                                )
                                            }
                                            disabled={this.state.isEditing} // Thêm disabled
                                            style={{
                                                backgroundColor: this.state
                                                    .isEditing
                                                    ? "#e9ecef"
                                                    : "white",
                                            }} // Thêm style
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <label
                                            htmlFor="password"
                                            className="form-label"
                                        >
                                            <FormattedMessage id="manage-user.password" />
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(event) =>
                                                this.onChangeInput(
                                                    event,
                                                    "password"
                                                )
                                            }
                                            disabled={this.state.isEditing} // Thêm disabled
                                            style={{
                                                backgroundColor: this.state
                                                    .isEditing
                                                    ? "#e9ecef"
                                                    : "white",
                                            }} // Thêm style
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <label
                                            htmlFor="firstName"
                                            className="form-label"
                                        >
                                            <FormattedMessage id="manage-user.firstname" />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            placeholder="Firstname"
                                            value={firstName}
                                            onChange={(event) =>
                                                this.onChangeInput(
                                                    event,
                                                    "firstName"
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label
                                            htmlFor="lastName"
                                            className="form-label"
                                        >
                                            <FormattedMessage id="manage-user.lastname" />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            placeholder="Lastname"
                                            value={lastName}
                                            onChange={(event) =>
                                                this.onChangeInput(
                                                    event,
                                                    "lastName"
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <label
                                            htmlFor="phonenumber"
                                            className="form-label"
                                        >
                                            <FormattedMessage id="manage-user.phonenumber" />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phonenumber"
                                            placeholder="Phonenumber"
                                            value={phoneNumber}
                                            onChange={(event) =>
                                                this.onChangeInput(
                                                    event,
                                                    "phoneNumber"
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <label
                                            htmlFor="address"
                                            className="form-label"
                                        >
                                            <FormattedMessage id="manage-user.address" />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            placeholder="1234 Main St"
                                            value={address}
                                            onChange={(event) =>
                                                this.onChangeInput(
                                                    event,
                                                    "address"
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <label
                                            htmlFor="gender"
                                            className="form-label"
                                        >
                                            <FormattedMessage id="manage-user.gender" />
                                        </label>
                                        <select
                                            id="inputState"
                                            className="form-control"
                                            onChange={(event) =>
                                                this.onChangeInput(
                                                    event,
                                                    "gender"
                                                )
                                            }
                                            value={this.state.gender}
                                        >
                                            {genders &&
                                                genders.length > 0 &&
                                                genders.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.key}
                                                        >
                                                            {language ===
                                                            languages.VI
                                                                ? item.valueVi
                                                                : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>

                                    <div className="col-md-3">
                                        <label
                                            htmlFor="position"
                                            className="form-label"
                                        >
                                            <FormattedMessage id="manage-user.position" />
                                        </label>
                                        <select
                                            id="inputState"
                                            className="form-control"
                                            onChange={(event) =>
                                                this.onChangeInput(
                                                    event,
                                                    "position"
                                                )
                                            }
                                            value={this.state.position}
                                        >
                                            {positions &&
                                                positions.length > 0 &&
                                                positions.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.key}
                                                        >
                                                            {language ===
                                                            languages.VI
                                                                ? item.valueVi
                                                                : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>

                                    <div className="col-md-3">
                                        <label
                                            htmlFor="role"
                                            className="form-label"
                                        >
                                            <FormattedMessage id="manage-user.role" />
                                        </label>
                                        <select
                                            id="inputState"
                                            className="form-control"
                                            onChange={(event) =>
                                                this.onChangeInput(
                                                    event,
                                                    "role"
                                                )
                                            }
                                            value={this.state.role}
                                        >
                                            {roles &&
                                                roles.length > 0 &&
                                                roles.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.key}
                                                        >
                                                            {language ===
                                                            languages.VI
                                                                ? item.valueVi
                                                                : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label
                                            htmlFor="avatar"
                                            className="form-label"
                                        >
                                            <FormattedMessage id="manage-user.avatar" />
                                        </label>
                                        <div>
                                            <input
                                                id="previewImg"
                                                type="file"
                                                hidden
                                                onChange={(event) =>
                                                    this.handleOnchangeImage(
                                                        event,
                                                        "avatar"
                                                    )
                                                }
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={this.triggerFileInput}
                                            >
                                                Tải ảnh
                                                <i className="fas fa-upload"></i>
                                            </button>
                                            <div
                                                onClick={() =>
                                                    this.openPreviewImage()
                                                }
                                                className="preview-image"
                                                style={{
                                                    backgroundImage: `url(${this.state.previewImgURL})`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() =>
                                        this.state.isEditing
                                            ? this.handleSubmitEditUser()
                                            : this.handleOnSubmit()
                                    }
                                >
                                    <FormattedMessage
                                        id={
                                            this.state.isEditing
                                                ? "Edit"
                                                : "manage-user.submit"
                                        }
                                    />
                                </button>
                            </form>

                            {/* hiển thị danh sách user */}
                            <div className="user-table-redux mt-4 ">
                                {this.props.isLoadingUsers && (
                                    <div className="text-center">
                                        <span>Đang tải dữ liệu...</span>
                                    </div>
                                )}
                                <table class="table table-striped table-hover table-bordered">
                                    <thead class="table-dark custom-header">
                                        <tr>
                                            <th style={{ width: "25%" }}>
                                                Email
                                            </th>
                                            <th style={{ width: "20%" }}>
                                                Firstname
                                            </th>
                                            <th style={{ width: "20%" }}>
                                                Lastname
                                            </th>
                                            <th style={{ width: "25%" }}>
                                                Address
                                            </th>
                                            <th style={{ width: "10%" }}>
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.users &&
                                        this.props.users.length > 0 ? (
                                            this.props.users.map(
                                                (item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                {item.email}
                                                            </td>
                                                            <td>
                                                                {item.firstName}
                                                            </td>
                                                            <td>
                                                                {item.lastName}
                                                            </td>
                                                            <td>
                                                                {item.address}
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-warning mx-1"
                                                                    onClick={() =>
                                                                        this.handleEditUser(
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fas fa-pencil-alt"></i>
                                                                </button>
                                                                <button
                                                                    className="btn btn-danger mx-1"
                                                                    onClick={() =>
                                                                        this.handleDeleteUser(
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fas fa-trash"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="text-center"
                                                >
                                                    Không có dữ liệu
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true && (
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() =>
                            this.setState({
                                isOpen: false,
                            })
                        }
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoading: state.admin.isLoading,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        success: state.admin.success,
        error: state.admin.error,
        users: state.admin.users,
        isLoadingUsers: state.admin.isLoadingUsers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) =>
        //     dispatch(actions.changeLanguageApp(language)),
        fetchAllUsers: () => dispatch(actions.fetchAllUsersStart()),
        deleteUser: (userId) => dispatch(actions.deleteUserStart(userId)),
        editUser: (data) => dispatch(actions.editUserStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

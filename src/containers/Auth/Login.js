import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { languages } from "../../utils";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";

import { handleLoginApi } from "../../services/userServices";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            errMessage: "",
        };
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            userName: event.target.value,
        });
    };
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };
    handleLogin = async () => {
        this.setState({
            errMessage: "",
        });
        try {
            let response = await handleLoginApi(
                this.state.userName,
                this.state.password
            );
            if (response.data.errCode !== 0) {
                this.setState({
                    errMessage: response.data.message, // Lấy thông báo lỗi từ phản hồi của server
                });
            } else {
                // Đăng nhập thành công, bạn có thể thêm các hành động khác ở đây
                this.props.userLoginSuccess(response.data.user);
                console.log("Login successful!");
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                this.setState({
                    errMessage: error.response.data.message, // Lấy thông báo lỗi từ phản hồi của server
                });
            } else {
                this.setState({
                    errMessage: error.message,
                });
            }
        }
    };

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={4}>
                        <h2 className="text-center mt-5">Login</h2>
                        <Form>
                            <Form.Group className="mb-4" controlId="form1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={this.state.userName}
                                    onChange={(event) => {
                                        this.handleOnChangeUsername(event);
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="form2">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={(event) => {
                                        this.handleOnChangePassword(event);
                                    }}
                                />
                            </Form.Group>
                            <div className=" text-danger mb-4">
                                {this.state.errMessage}
                            </div>
                            <div className="d-flex justify-content-between mx-3 mb-4">
                                <Form.Check
                                    type="checkbox"
                                    id="flexCheckDefault"
                                    label="Remember me"
                                />
                                <a href="#!">Forgot password?</a>
                            </div>

                            <Button
                                variant="primary"
                                className="mb-4 w-100"
                                onClick={() => {
                                    this.handleLogin();
                                }}
                            >
                                Sign in
                            </Button>

                            <div className="text-center">
                                <p>
                                    Not a member? <a href="#!">Register</a>
                                </p>
                                <p>or sign up with:</p>

                                <div
                                    className="d-flex justify-content-between mx-auto"
                                    style={{ width: "40%" }}
                                >
                                    <Button
                                        variant="outline-primary"
                                        className="m-1"
                                        style={{ color: "#1266f1" }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faFacebookF}
                                            size="sm"
                                        />
                                    </Button>

                                    <Button
                                        variant="outline-primary"
                                        className="m-1"
                                        style={{ color: "#1266f1" }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faTwitter}
                                            size="sm"
                                        />
                                    </Button>

                                    <Button
                                        variant="outline-primary"
                                        className="m-1"
                                        style={{ color: "#1266f1" }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faGoogle}
                                            size="sm"
                                        />
                                    </Button>

                                    <Button
                                        variant="outline-primary"
                                        className="m-1"
                                        style={{ color: "#1266f1" }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faGithub}
                                            size="sm"
                                        />
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

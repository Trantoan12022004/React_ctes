import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/UserRedux";
import UserDisplay from "../containers/System/UserDisplay";
import EventManage from "../containers/System/EventManage";
import EventDescription from "../containers/System/EventDescription";
import UserDescription from "../containers/System/UserDescription";
import Header from "../containers/Header/Header";
import MarkdownEditor from "../containers/System/MarkdownEditor";
import EventDisplay from "../containers/System/EventDisplay";
import EventRegistrationManage from "../containers/System/EventRegistrationManage";
import { toast } from "react-toastify";

class System extends Component {
    componentDidMount() {
        const { userInfo, history } = this.props;
        // Kiểm tra nếu không phải là Admin thì chuyển hướng và hiển thị thông báo
        if (userInfo && userInfo.roleId !== 'R1') {
            history.push('/home');
        }
    }

    componentDidUpdate(prevProps) {
        // Kiểm tra thay đổi trong userInfo hoặc trạng thái đăng nhập
        const { userInfo, isLoggedIn, history } = this.props;
        
        // Nếu vừa đăng nhập hoặc thông tin người dùng vừa thay đổi
        if (isLoggedIn !== prevProps.isLoggedIn || userInfo !== prevProps.userInfo) {
            // Kiểm tra lại quyền truy cập
            if (!isLoggedIn || (userInfo && userInfo.roleId !== 'R1')) {
                history.push('/home');
            }
        }
    }

    render() {
        const { systemMenuPath, isLoggedIn, userInfo } = this.props;
        console.log(isLoggedIn)

        
        // Chuyển hướng về trang chủ nếu không phải là admin
        if (!isLoggedIn) {
            return <Redirect to="/home" />;
        }

        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route
                                path="/system/user-redux"
                                component={UserRedux}
                            />
                            <Route
                                path="/system/user-display"
                                component={UserDisplay}
                            />
                            <Route
                                path="/system/event-manage"
                                component={EventManage}
                            />
                            <Route
                                path="/system/event-description"
                                component={EventDescription}
                            />
                            <Route
                                path="/system/markdown-editor"
                                component={MarkdownEditor}
                            />
                            <Route
                                path="/system/user-description"
                                component={UserDescription}
                            />
                            <Route
                                path="/system/event-display"
                                component={EventDisplay}
                            />
                            <Route
                                path="/system/event-registration/:id"
                                component={EventRegistrationManage}
                            />
                            <Route
                                component={() => {
                                    return <Redirect to={systemMenuPath} />;
                                }}
                            />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInforr,  // Lấy thông tin người dùng từ Redux store
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
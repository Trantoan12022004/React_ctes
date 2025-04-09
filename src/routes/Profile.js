import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ManageList from "../containers/UserProfile/ManageList"
import UserList from "../containers/UserProfile/UserList"
import UserProfile from "../containers/UserProfile/UserProfile"
import { toast } from "react-toastify";

class System extends Component {
    componentDidMount() {
        const { userInfo, history } = this.props;
        // Kiểm tra nếu không phải là Admin thì chuyển hướng và hiển thị thông báo
        // if (userInfo && userInfo.roleId !== 'R1') {
        //     history.push('/home');
        // }
    }

    componentDidUpdate(prevProps) {
        // Kiểm tra thay đổi trong userInfo hoặc trạng thái đăng nhập
        const { userInfo, isLoggedIn, history } = this.props;
        
    }

    render() {
        const { isLoggedIn } = this.props;
        console.log(isLoggedIn)
        


        return (
            <React.Fragment>
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route
                                path="/user-profile/manage-list"
                                component={ManageList}
                            />
                            <Route
                                path="/user-profile/profile/:id"
                                component={UserProfile}
                            />
                            <Route
                                path="/user-profile"
                                component={UserList}
                            />
                          
                            <Route
                                component={() => {
                                    return <Redirect to="/user-profile" />;
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
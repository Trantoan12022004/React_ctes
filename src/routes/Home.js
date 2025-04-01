import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";


class Home extends Component {
    render() {
        const { isLoggedIn, userInforr } = this.props;
               
        // Xác định đường dẫn redirect dựa vào trạng thái đăng nhập và role
        let linkToRedirect = "/home";
        
        if (isLoggedIn) {
            // Đã đăng nhập, kiểm tra role
            const roleId = userInforr?.roleId;
            
            if (roleId === 'R1') {
                // Nếu là Admin (R1)
                linkToRedirect = "/system/user-display";
            } else {
                // Các role khác
                linkToRedirect = "/home";
            }
        }

        return <Redirect to={linkToRedirect} />;
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInforr: state.user.userInforr
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

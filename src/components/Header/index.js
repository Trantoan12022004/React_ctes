import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import MenuItems from "./MenuItems";
import { languages } from "../../utils/constant";
import normalLogo from "../../assets/images/logos/logo.png";
import stickyLogo from "../../assets/images/logos/logo.png";
import "./index.scss";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,        // Trạng thái menu trên mobile
            isVisible: false,       // Trạng thái hiển thị sticky header
            userMenuOpen: false,    // Trạng thái menu dropdown của người dùng
        };

        // Tạo ref cho dropdown để xử lý click outside
        this.dropdownRef = React.createRef();
    }

    // ===== Lifecycle Methods =====
    componentDidMount() {
        // Thêm các event listeners khi component được mount
        window.addEventListener("scroll", this.toggleVisibility);
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        // Loại bỏ các event listeners khi component bị unmount
        window.removeEventListener("scroll", this.toggleVisibility);
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    // ===== Header Visibility Controls =====
    toggleVisibility = () => {
        // Hiển thị sticky header sau khi cuộn 100px
        if (window.pageYOffset > 100) {
            this.setState({ isVisible: true });
        } else {
            this.setState({ isVisible: false });
        }
    };

    // ===== Menu Controls =====
    toggleMenu = () => {
        // Mở/đóng menu trên mobile
        this.setState((prevState) => ({
            menuOpen: !prevState.menuOpen,
        }));
    }

    // ===== User Menu Controls =====
    toggleUserMenu = () => {
        // Mở/đóng dropdown menu người dùng
        this.setState((prevState) => ({
            userMenuOpen: !prevState.userMenuOpen,
        }));
    }

    handleClickOutside = (event) => {
        // Đóng menu dropdown khi click ra ngoài
        if (this.dropdownRef && this.dropdownRef.current && 
            !this.dropdownRef.current.contains(event.target)) {
            this.setState({ userMenuOpen: false });
        }
    };

    // ===== Render Method =====
    render() {
        const { menuOpen, isVisible, userMenuOpen } = this.state;
        const {
            topbarEnable,
            headerClass,
            parentMenu,
            headerNormalLogo,
            headerStickyLogo,
            isLoggedIn,
            userInforr,
            language,
        } = this.props;

        return (
            <header
                id="react-header"
                className={headerClass ? headerClass : "react-header react-header-three"}
            >
                <div className={isVisible ? "header-area react-sticky" : "header-area"}>
                    {/* ===== Topbar Area ===== */}
                    {topbarEnable && (
                        <div className="topbar-area style1">
                            <div className="container">
                                <div className="row">
                                    {/* Contact Information */}
                                    <div className="col-lg-7">
                                        <div className="topbar-contact">
                                            <ul>
                                                <li>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-phone"
                                                    >
                                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                                    </svg>
                                                    <a href="tel:(+84)0123456789">
                                                        {" "}
                                                        (+84) 0123 456 789
                                                    </a>
                                                </li>
                                                <li>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-mail"
                                                    >
                                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                        <polyline points="22,6 12,13 2,6"></polyline>
                                                    </svg>
                                                    <a href="mailto:info@ctes.org">
                                                        info@ctes.org
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Social Links */}
                                    <div className="col-lg-5 text-right">
                                        <div className="toolbar-sl-share">
                                            <ul className="social-links">
                                                <li>
                                                    <a href="#" aria-label="Facebook">
                                                        <span
                                                            aria-hidden="true"
                                                            className="social_facebook"
                                                        ></span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" aria-label="Twitter">
                                                        <span
                                                            aria-hidden="true"
                                                            className="social_twitter"
                                                        ></span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" aria-label="LinkedIn">
                                                        <span
                                                            aria-hidden="true"
                                                            className="social_linkedin"
                                                        ></span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ===== Menu Area ===== */}
                    <div className="menu-part">
                        <div className="container">
                            <div className="react-main-menu">
                                <nav>
                                    {/* Logo & Mobile Menu Toggle */}
                                    <div className="menu-toggle">
                                        <div className="logo">
                                            {isVisible ? (
                                                <Link to="/" className="logo-text">
                                                    <img
                                                        src={headerStickyLogo || stickyLogo}
                                                        alt="CTES Logo"
                                                    />
                                                </Link>
                                            ) : (
                                                <Link to="/" className="logo-text">
                                                    <img
                                                        src={headerNormalLogo || normalLogo}
                                                        alt="CTES Logo"
                                                    />
                                                </Link>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            id="menu-btn"
                                            className={menuOpen ? "mobile-menu-btn open" : "mobile-menu-btn"}
                                            onClick={this.toggleMenu}
                                            aria-label="Toggle menu"
                                        >
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                        </button>
                                    </div>

                                    {/* Main Menu Content */}
                                    <div className={menuOpen ? "react-inner-menus menu-open" : "react-inner-menus"}>
                                        {/* Navigation Items */}
                                        <ul id="backmenu" className="react-menus react-sub-shadow">
                                            <MenuItems parentMenu={parentMenu} />
                                        </ul>

                                        {/* User Actions Area */}
                                        <div className="header-actions">
                                            {!isLoggedIn ? (
                                                // Login Button for Non-authenticated Users
                                                <div className="login-button">
                                                    <Link to="/login">
                                                        <i className="fas fa-sign-in-alt"></i>{" "}
                                                        Đăng nhập
                                                    </Link>
                                                </div>
                                            ) : (
                                                // User Dropdown for Authenticated Users
                                                <div className="user-dropdown" ref={this.dropdownRef}>
                                                    <div className="dropdown">
                                                        <button 
                                                            className="btn btn-secondary dropdown-toggle" 
                                                            type="button" 
                                                            onClick={this.toggleUserMenu}
                                                            aria-label="User menu"
                                                        >
                                                            {userInforr?.lastName || "User"}
                                                            {userInforr?.image ? (
                                                                <img 
                                                                    src={userInforr.image} 
                                                                    alt="User Avatar"
                                                                    className="dropdown-avatar"
                                                                />
                                                            ) : (
                                                                <span className="dropdown-avatar-placeholder">
                                                                    {userInforr?.firstName?.charAt(0) || userInforr?.lastName?.charAt(0) || 'U'}
                                                                </span>
                                                            )}
                                                        </button>
                                                        
                                                        {/* User Dropdown Menu */}
                                                        {userMenuOpen && (
                                                            <div className="dropdown-menu show">
                                                                <Link to="/user-profile" 
                                                                    className="dropdown-item" 
                                                                    onClick={() => this.setState({ userMenuOpen: false })}
                                                                >
                                                                    <i className="fas fa-user"></i> Hồ sơ cá nhân
                                                                </Link>
                                                                
                                                                {/* Admin Option - Only For Admins */}
                                                                {userInforr?.roleId === 'R1' && (
                                                                    <Link 
                                                                        to="/system/user-display" 
                                                                        className="dropdown-item" 
                                                                        onClick={() => this.setState({ userMenuOpen: false })}
                                                                    >
                                                                        <i className="fas fa-cogs"></i> Quản trị hệ thống
                                                                    </Link>
                                                                )}
                                                                
                                                                <div className="dropdown-divider"></div>
                                                                
                                                                {/* Logout Option */}
                                                                <a 
                                                                    className="dropdown-item" 
                                                                    onClick={() => {
                                                                        this.props.processLogout();
                                                                        this.setState({ userMenuOpen: false });
                                                                        window.location.href = "/home";
                                                                    }}
                                                                >
                                                                    <i className="fas fa-sign-out-alt"></i> Đăng xuất
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

// Redux Connection
const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInforr: state.user.userInforr,
    language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
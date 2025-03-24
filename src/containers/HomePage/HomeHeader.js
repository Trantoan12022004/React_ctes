import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
// import HomeHeader from "../../components/HomeHeader";

class Headers extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content mt">
                        <div className="left-content">
                            <i className="fa fa-bars" aria-hidden="true"></i>
                            <div className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <b><FormattedMessage id="home-header.speciality" /></b>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.search-doctor-speciality" />
                                </div>
                            </div>
                            <div className="child-content">
                                <b><FormattedMessage id="home-header.health-facility" /></b>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.choose-hospital" />
                                </div>
                            </div>
                            <div className="child-content">
                                <b><FormattedMessage id="home-header.doctor" /></b>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.choose-good-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <b><FormattedMessage id="home-header.examination-package" /></b>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.general-health-check" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <button type="button" className="btn btn-info">
                                    <FormattedMessage id="home-header.support" />
                                </button>
                            </div>
                            <div className="language-vi active">VN</div>
                            <div className="language-en">EN</div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="title1"><FormattedMessage id="home-header.platform" /></div>
                    <div className="title2"><FormattedMessage id="home-header.care" /></div>
                    <div className="search">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Tìm kiếm" />
                    </div>
                    <div className="services">
                        <div className="service-item">
                            <i className="fas fa-stethoscope"></i>
                            <p><FormattedMessage id="home-header.specialist" /></p>
                        </div>
                        <div className="service-item">
                            <i className="fas fa-phone"></i>
                            <p><FormattedMessage id="home-header.remote" /></p>
                        </div>
                        <div className="service-item">
                            <i className="fas fa-notes-medical"></i>
                            <p><FormattedMessage id="home-header.general" /></p>
                        </div>
                        <div className="service-item">
                            <i className="fas fa-vial"></i>
                            <p><FormattedMessage id="home-header.test" /></p>
                        </div>
                        <div className="service-item">
                            <i className="fas fa-heart"></i>
                            <p><FormattedMessage id="home-header.mental" /></p>
                        </div>
                        <div className="service-item">
                            <i className="fas fa-heart"></i>
                            <p><FormattedMessage id="home-header.dental" /></p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Headers);

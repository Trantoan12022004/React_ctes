import React, { Component } from "react";
import { connect } from "react-redux";
import { languages } from "../../../utils/constant";
import "./DetailDoctor.scss";
import { getDoctorDetailService } from "../../../services/userServices";
import { FormattedMessage } from 'react-intl';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            loading: true,
        };
    }

    async componentDidMount() {
        console.log("check props", this.props.match.params.id);
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            try {
                const res = await getDoctorDetailService(
                    this.props.match.params.id
                );
                console.log("check res", res);
                if (res && res.data.errCode === 0) {
                    this.setState({
                        detailDoctor: res.data.data,
                        loading: false,
                    });
                }
            } catch (e) {
                console.error("Error fetching doctor details:", e);
            }
        }
    }
    render() {
        const { detailDoctor, loading } = this.state;
        const { language } = this.props;
        console.log("check loading", loading);
        console.log("check detailDoctor", detailDoctor);
        if (loading) {
            return <div className="loading">Loading...</div>;
        }

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
                                <b>
                                    <FormattedMessage id="home-header.speciality" />
                                </b>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.search-doctor-speciality" />
                                </div>
                            </div>
                            <div className="child-content">
                                <b>
                                    <FormattedMessage id="home-header.health-facility" />
                                </b>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.choose-hospital" />
                                </div>
                            </div>
                            <div className="child-content">
                                <b>
                                    <FormattedMessage id="home-header.doctor" />
                                </b>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.choose-good-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <b>
                                    <FormattedMessage id="home-header.examination-package" />
                                </b>
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
                <div className="doctor-detail-container mt-50">
                    <div className="intro-doctor">
                        <div className="content-left">
                            <img src={detailDoctor.image} alt="Doctor" />
                        </div>
                        <div className="content-right">
                            <div className="up">
                                {language === languages.VI
                                    ? `${detailDoctor.lastName} ${detailDoctor.firstName}`
                                    : `${detailDoctor.firstName} ${detailDoctor.lastName}`}
                            </div>
                            <div className="down">
                                {detailDoctor.doctorMarkdown && (
                                    <span>
                                        {
                                            detailDoctor.doctorMarkdown
                                                .description
                                        }
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="schedule-doctor">
                        {/* Add schedule component here later */}
                    </div>

                    <div className="detail-info-doctor">
                        {detailDoctor.doctorMarkdown && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: detailDoctor.doctorMarkdown
                                        .contentHTML,
                                }}
                            ></div>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);

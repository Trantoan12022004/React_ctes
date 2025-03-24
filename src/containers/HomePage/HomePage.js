import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Speciality from "./Section/Speciality";
import Medical from "./Section/Medical";
import FeaturedDoctors from "./Section/FeaturedDoctors";
import Manual from "./Section/Manual";
class HomePage extends Component {
    render() {
        return (
            <div>
                <HomeHeader />
                <Speciality />
                <Medical />
                <FeaturedDoctors />
                <Manual />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

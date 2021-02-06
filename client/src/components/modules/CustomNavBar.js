import Button from '@material-ui/core/Button';

import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { navigate, Router, Redirect, Route } from "@reach/router";

import "../../utilities.css";
import "../pages/LandingPage.css";

import starterImage from "../Assets/landing_page_photo.png";


//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "480244722799-u3pjrlh16hioq4pe3bsb873pc5nrc8pe.apps.googleusercontent.com";

class CustomNavBar extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }


  goToFeedback = () =>{

  }

  goToTeam = () => {
    navigate("/team");



  }


  goToAbout = () => {
    navigate("/about");



  }


  goToStart = () => {
    navigate("/start");



  }

  render() {
    return (


                <div className="navigation-section">
                <a className="navigation-item" onClick={this.goToStart}>Profile</a>
                {/* <a className="navigation-item" href="google.com" >Feedback</a> */}
                <div className="navigation-item" onclick="location.href='https://stackoverflow.com/questions/29128746/keep-anchor-tag-from-changing-styles';"><div> Feedback </div></div> 
        <a className="navigation-item" onClick={this.goToTeam}>Team</a>
    </div>

    
    );
  }
}

export default CustomNavBar;

import Button from '@material-ui/core/Button';

import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { navigate, Router, Redirect, Route } from "@reach/router";

import "../../utilities.css";
import "./LandingPage.css";

import starterImage from "../Assets/landing_page_photo.png";


//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "480244722799-u3pjrlh16hioq4pe3bsb873pc5nrc8pe.apps.googleusercontent.com";

class LandingPage extends Component {
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
      <div className="app-c">

                <div className="navigation-section">
                {this.props.userId ?(<a className="navigation-item" onClick={this.goToStart}>Profile</a>
):null}
                <a className="navigation-item" href="https://forms.gle/mxbxmpmRSH2EaNzi8">Feedback</a>
                <a className="navigation-item" onClick={this.goToTeam}>Team</a>
                </div>

    <div className="starter-container">
        <img className="starter-image" src={starterImage}/>
        <div className="description-section">

        <h1 className="bookclub-title">BookClub</h1>
        <h2>Immerse yourself in your virtual library and talk with fellow booklovers about your favorite reads</h2>
<div className="buttons-wrapper">
        {this.props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Leave the library"
            
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <GoogleLogin
           
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Start reading"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}

        < div className= "button-wrapper">

        <Button variant="contained" color="primary" onClick={this.goToAbout}>  Learn more
    </Button>
        </div>
             
    
    </div>


        </div>

    </div>
      </div>
    );
  }
}

export default LandingPage;

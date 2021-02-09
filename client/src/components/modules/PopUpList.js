import Button from '@material-ui/core/Button';

import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { navigate, Router, Redirect, Route } from "@reach/router";

import "../../utilities.css";
import "./CustomNavBar.css";
import Badge from '@material-ui/core/Badge';
import MailIcon from "@material-ui/icons/Mail";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import addFriends from "../Assets/hello.png";
import notification from "../Assets/notification.png";
import "./ProfileNavBar.css";
import home from "../Assets/home.png"
import bookclub from "../Assets/bookclub.png";

import "./PopUpList.css";



import starterImage from "../Assets/landing_page_photo.png";


//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "480244722799-u3pjrlh16hioq4pe3bsb873pc5nrc8pe.apps.googleusercontent.com";

class PopUpList extends Component {
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

  testing=()=>{
      console.log("asjkdkas");
  }

  render() {
    return (
        <div className="popup-container">
            <div>HLLLLLL</div>
            <div>HLLLLLL</div>
            <div>HLLLLLL</div>


        </div>

    
    );
  }
}

export default PopUpList;

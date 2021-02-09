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


import { get, post } from "../../utilities.js";



import starterImage from "../Assets/landing_page_photo.png";
import PopUpList from './PopUpList';


//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "480244722799-u3pjrlh16hioq4pe3bsb873pc5nrc8pe.apps.googleusercontent.com";

class ProfileNavBar extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      bookInvitations:[],
      invitations:[],
      bookclubClicked:false


    };
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

  handleBookclubClick =() => {
    if (!this.state.bookclubClicked){
      this.getBookclubInvites().then((bookInvitations)=>{
        this.setState({
          bookInvitations:bookInvitations,
          bookclubClicked:!this.state.bookclubClicked
        })
      })
        }else{

          this.setState({
            
            bookclubClicked:!this.state.bookclubClicked
          });

        }

    }
  

  getInvites = async () => {
    const body = { user: this.props.userId };
    const goalObjs = await get("/api/viewfriendrequests", body);
    return goalObjs;
  };

  getBookclubInvites = async () => {
    const body = { user: this.props.userId };
    const goalObjs = await get("/api/viewbookclubrequests", body);
    return goalObjs;
  };

  testing=()=>{
      console.log("asjkdkas");
  }

  showBookclubInvitations =() => {
    this.getBookclubInvites().then((bookInvitations)=>{
      this.setState({
        bookInvitations:bookInvitations
      })
    })
  }


  bookclubRequestItem = (bookclubMember, index) => {

    console.log("showing item of request bookclub");
    return (
      <div className="invitation-item">
        <p>{bookclubMember.bookclub_owner_name} wants to you to join their {bookclubMember.bookclub_title} bookclub.</p>
        <button >Acccept</button>
        <button >Deny</button>
      </div>
    );
  }

  bookclubInvitationContent = () => {

    if (this.state.bookInvitations.length === 0) {

      return (
        <div className="popup-container">
          <p>It looks like you don't have any bookclub invitations yet!</p>
          <p>Click to create your own bookclub.</p>
        </div>
      );

    } else {
      return (

        <div className="popup-container">
        {this.state.bookInvitations.map((invitation, index) => this.bookclubRequestItem(invitation, index))}
      </div>)
   
        
    }


  }

  render() {
    return (
        <div className="personal-navbar-container">
<div onClick={this.testing}>
  
        <img src={addFriends}></img>
        <PopUpList/>
            </div>

            <div onClick={this.handleBookclubClick}>
        <img src={bookclub}></img>
       {this.state.bookclubClicked ? this.bookclubInvitationContent() : null}
            </div>
            <div onClick={this.testing}>
        <img src={notification}></img>
            </div>

            <div onClick={this.testing}>
        <img src={home}></img>
            </div>


        </div>

    
    );
  }
}

export default ProfileNavBar;

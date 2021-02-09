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
      bookclubClicked:false,
     friendClicked:false,
      countBookInvitations:0,
      countFriendInvitations:0,


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
          countBookInvitations:bookInvitations.length,
          bookclubClicked:!this.state.bookclubClicked
        })
      })
        }else{

          this.setState({
            
            bookclubClicked:!this.state.bookclubClicked
          });

        }

    }


    handleFriendClick =() => {
      if (!this.state.friendClicked){
        this.getInvites().then((bookInvitations)=>{
          this.setState({
           invitations:bookInvitations,
           countFriendInvitations:bookInvitations.length,
           friendClicked:!this.state.friendClicked
          })
        })
          }else{
  
            this.setState({
              
              friendClicked:!this.state.friendClicked
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

  friendRequestItem = (invitation, index) => {
    return (
      <div className="invitation-item">
        <p>{invitation.friend_requester_name} wants to be friends.</p>
        {/* <button onClick={() => this.respondFriend(invitation.user_id, true, index, invitation._id)}>Acccept</button>
        <button onClick={() => this.respondFriend(invitation.user_id, false, index, invitation._id)}>Deny</button> */}
      </div>
    );
  }

  bookclubInvitationContent = () => {

    if (this.state.bookInvitations.length === 0) {

      return (
        <div className="list-container-navbar">
          <p>It looks like you don't have any bookclub invitations yet!</p>
          <p>Click to create your own bookclub.</p>
        </div>
      );

    } else {
      return (

        <div className="list-container-navbar">
        {this.state.bookInvitations.map((invitation, index) => this.bookclubRequestItem(invitation, index))}
      </div>)
   
        
    }


  }

  friendInvitationContent = () => {

    if (this.state.bookInvitations.length === 0) {

      return (
        <div className="list-container-navbar">
          <p>It looks like you don't have any bookclub invitations yet!</p>
          <p>Click to create your own bookclub.</p>
        </div>
      );

    } else {
      return (

        <div className="list-container-navbar">
        {this.state.invitations.map((invitation, index) => this.friendRequestItem(invitation, index))}
      </div>)
   
        
    }


  }


  navigateToStart = () => {
    navigate("/start");
  }

  goToHome = () => {
    navigate("/");
  }

  render() {
    return (
        <div className="personal-navbar-container">
          <div className="navbar-title" onClick={this.goToHome}> WhatWeRead</div>


      <div onClick={this.handleFriendClick} className="personal-navbar-item">
        <img src={addFriends}></img>
        {this.state.countFriendInvitations!==0 ? <div className="notify-circle"></div>:null}
        {this.state.bookclubClicked ? this.friendInvitationContent() : null}
            </div>

            <div onClick={this.handleBookclubClick} className="personal-navbar-item">
        <img src={bookclub}></img>
        {this.state.countBookInvitations!==0 ? <div className="notify-circle"></div>:null}
       {this.state.friendClicked ? this.bookclubInvitationContent() : null}
    
            </div>


            <div onClick={this.navigateToStart} className="personal-navbar-item">
        <img src={home}></img>
            </div>


        </div>

    
    );
  }
}

export default ProfileNavBar;

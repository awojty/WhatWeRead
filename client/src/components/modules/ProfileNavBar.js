import Button from '@material-ui/core/Button';

import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { navigate, Router, Redirect, Route } from "@reach/router";
import OnOutsiceClick from 'react-outclick';

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

    this.getInvites().then((Invitations)=>{
      console.log("friend invitations i got", Invitations);
      this.setState({
       invitations:Invitations,
       countFriendInvitations:Invitations.length,
      
      })
    });

    this.getBookclubInvites().then((bookInvitations)=>{
      this.setState({
        bookInvitations:bookInvitations,
        countBookInvitations:bookInvitations.length,
        
      })
    });


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


          this.setState({
            
            bookclubClicked:!this.state.bookclubClicked
          });

        

    }


    handleFriendClick =() => {


  
            this.setState({
              
              friendClicked:!this.state.friendClicked
            });
  
          
  
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
      <div className="list-item">
        <p>{bookclubMember.bookclub_owner_name} wants to you to join {bookclubMember.bookclub_title} bookclub.</p>
        <button onClick={() => this.respondBookclub(bookclubMember.user_id, true, index, bookclubMember._id)}>Acccept</button>
        <button onClick={() => this.respondBookclub(bookclubMember.user_id, false, index, bookclubMember._id)}>Deny</button>

      </div>
    );
  }

  friendRequestItem = (friend, index) => {
    let name;
    let _id;
    console.log("props", this.props);

    console.log("friend", friend);
    console.log("my name", this.props.name);
    if (friend.friend_name === this.props.name) {
      name = friend.friend_requester_name;
      _id = friend.user_id;
    } else {
      name = friend.friend_name;
      _id = friend.friend_id
    };

    return (
      <div className="list-item">
        <p>{name} wants to be friends.</p>
        <button onClick={() => this.respondFriend(friend.user_id, true, index, friend._id)}>Acccept</button>
        <button onClick={() => this.respondFriend(friend.user_id, false, index, friend._id)}>Deny</button>
      </div>
    );
  }

  removeAtIndex = (array, index) => {

    console.log(index);

    let newArray = [...array]


    if (index > -1) {

      newArray.splice(index, 1);
      console.log(newArray);

      return newArray;
    }



  }


  respondFriend = (user_id, accepted, index, _id) => {

    if(this.props.respondFriend !==undefined){

      console.log("im unsing the page fuctino" );
      this.props.respondFriend(user_id, accepted, index, _id);

      let count = this.removeAtIndex(this.state.invitations, index);
      this.setState({
        invitations: count,
        countFriendInvitations:count.length,
      });
     
      
    }else{
      console.log("outside fo id");
      const body = {
        _id: _id,
        accepted: accepted,
        user_id: user_id,
      };
  
      if (accepted === true) {
  
        post("/api/respondfriend", body).then(
  
          this.setState({
            invitations: this.removeAtIndex(this.state.invitations, index)
          })
        );
      } else {
  
        const query = {
          _id: _id,
          user_id: user_id,
        };
        post("/api/deletefriend", query).then(
          
          this.setState({
            invitations: this.removeAtIndex(this.state.invitations, index)
          })
  
        );
      }
    }


  }

  respondBookclub = (user_id, accepted, index, _id) => {

    const body = {
      _id: _id,
      accepted: accepted,
      member_id: user_id,
    };

    if (accepted === true) {

      post("/api/respondbookclubinvite", body).then(

        this.setState({
          bookclubInvites: this.removeAtIndex(this.state.bookclubInvites, index)
        })
      );
    } else {

      const query = {
        _id: _id,
        member_id: user_id,
      };
      post("/api/deletebookmember", query).then(
        this.setState({
          bookclubInvites: this.removeAtIndex(this.state.bookclubInvites, index)
        })

      );
    }
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

    if (this.state.invitations.length === 0) {

      return (
        <div className="list-container-navbar">
          <p>It looks like you don't have any friend invitations yet!</p>
          
        </div>
      );

    } else {

      console.log("dtste", this.state);
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

  closeAllLists = () => {

    this.setState({
            
      bookclubClicked:false,
      friendClicked:false,
    });

  }

  render() {

    console.log("state pf the navbar", this.state);


   
 
  
    return (
      <OnOutsiceClick
      onOutsideClick={() => this.closeAllLists()}>

        <div className="personal-navbar-container" onBlur={()=>console.log("blur")}>
          <div className="navbar-title" onClick={this.goToHome}> WhatWeRead</div>




<div>
      <div onClick={this.handleFriendClick} className="personal-navbar-item">
      {this.state.countFriendInvitations!==0 ? <div className="notify-circle"></div>:null} 
        
        <img src={addFriends}></img>
       
            </div>
            {this.state.friendClicked ? this.friendInvitationContent() : null}

            </div>

            <div>
              <div onClick={this.handleBookclubClick} className="personal-navbar-item">
        <img src={bookclub}></img>
        {this.state.countBookInvitations!==0 ? <div className="notify-circle"></div>:null}
    
            </div>
            {this.state.bookclubClicked ? this.bookclubInvitationContent() : null}
            </div>

            <div>
            <div onClick={this.navigateToStart} className="personal-navbar-item">
        <img src={home}></img>
            </div>
            </div>


        </div>

        </OnOutsiceClick>

    
    );
  }
}

export default ProfileNavBar;

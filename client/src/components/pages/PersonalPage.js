//got to library
//go to bookclubs
// accept dfirend request and book club requests
// view friends

import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Bookcase from "../modules/Bookcase.js";
import '../modules/App.css';
import "../../utilities.css";
import "./Skeleton.css";

import { navigate, Router, Redirect, Route } from "@reach/router";

import "./PersonalPage.css";

import { get, post } from "../../utilities.js";


import "./CreateBook.css";
import NavBar from "../modules/NavBar.js";
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "480244722799-u3pjrlh16hioq4pe3bsb873pc5nrc8pe.apps.googleusercontent.com";

class PersonalPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {

        title:"Title",
        invitations: [],
        friendList: [],
        showLoading: true,
        bookclubInvites:[],

    };
  }



  friendRequestsContent = (friendRequests) => {

    if (friendRequests.length === 0) {
      if (this.state.showLoading) {
        return (
          <p>Loading ...</p>
        );
      } else {
        return (
          <div className="u-large-text u-center">
            <p>It looks like you don't have any friend requests yet!</p>
            <p>Click  to add new friends.</p>
          </div>
        );
      }
    } else {
      return friendRequests.map((invitation, index) => this.friendRequestItem(invitation, index))
    }


  }

  friendRequestItem = (invitation, index) => {
    return (
      <div className="invitation-item">
        <p>{invitation.friend_requester_name} wants to be friends.</p>
        <button onClick={() => this.respondFriend(invitation.user_id, true, index, invitation._id)}>Acccept</button>
        <button onClick={() => this.respondFriend(invitation.user_id, false, index, invitation._id)}>Deny</button>
      </div>
    );
  }

  bookclubRequestItem = (bookclubMember, index) => {
    return (
      <div className="invitation-item">
        <p>{bookclubMember.bookclub_owner_name} wants to you to join their {bookclubMember.bookclub_title} bookclub.</p>
        <button onClick={() => this.respondBookclub(bookclubMember.user_id, true, index, bookclubMember._id)}>Acccept</button>
        <button onClick={() => this.respondBookclub(bookclubMember.user_id, false, index, bookclubMember._id)}>Deny</button>
      </div>
    );
  }


  friendsContent = (friends) => {

    if (friends.length === 0) {

      return (
        <div className="u-large-text u-center">
          <p>It looks like you don't have any friends yet!</p>
          <p>Click  to add new friends.</p>
        </div>
      );

    } else {
      return friends.map((friend, index) => this.friendItem(friend, index))
    }


  }

  friendItem = (friend, index) => {
    let name;
    let _id;
    if (friend.friend_name === this.props.name) {
      name = friend.friend_requester_name;
      _id = friend.user_id;
    } else {
      name = friend.friend_name;
      _id = friend.friend_id
    };

  


    const url = "/profile" ;



    return (

      <div className="invitation-item">
  <h4>{name}</h4>    
  
  </div>
    
);



  };

  bookclubInvitationContent = (invitations) => {

    if (invitations.length === 0) {

      return (
        <div className="u-large-text u-center">
          <p>It looks like you don't have any bookclub invitations yet!</p>
          <p>Click to create your own bookclub.</p>
        </div>
      );

    } else {
      return invitations.map((invitation, index) => this.bookclubRequestItem(invitation, index))
    }


  }


  


  onSubmit = () => {

    let body = {

    title: this.state.title,
    user_id:this.props.userId,

    };

    console.log("bookcase body", body);

    post("/api/createbookcase", body).then((response)=>{
          console.log("response");
          console.log(response);
          navigate("/home");

      })


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


  viewFriends = async () => {
    console.log("view friends");

    let friends = await get("/api/viewfriends");
    return friends;
  }

   componentDidMount() {
    this.getInvites().then((goalObjs) => {

        console.log("INV" + goalObjs);
        this.setState({
          invitations: goalObjs,
        });
      });
  
  
      this.viewFriends().then((friends) => {
        console.log("friends received", friends);
       

        this.setState({
              friendList: friends,
              showLoading:false
             }
              );
  
          })

          this.getBookclubInvites().then((inv) => {
            console.log("friends received", inv);
           
    
            this.setState({
                  bookclubInvites:inv,

                 }
                  );
      
              })
        }
  


  handleChangeBookcaseTitle = (event) => {
    this.setState({ title: event.target.value, });
  };


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

  
  respondFriend = (user_id, accepted, index, _id) => {

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


  //https://stackoverflow.com/questions/36326612/delete-item-from-state-array-in-react, used 01.15.2021
  removeAtIndex = (array, index) => {

    console.log(index);

    let newArray = [...array]


    if (index > -1) {

      newArray.splice(index, 1);
      console.log(newArray);

      return newArray;
    }



  }

  goToLibrary =() =>{
      navigate("/home");
  }

  goToBookclubs =() =>{
    navigate("/bookclubs");
}
goToAddBookclubs =() =>{
    navigate("/addbookclub");
}




  render() {
    console.log(this.state);
    return (
        <div className="App-Container">
        <NavBar/>
            <div className="personal-container">
            

              <div className="column">
            
            <div className="friend-requests-container">
            <h2 className="u-bold">Friend requests</h2>
                {this.friendRequestsContent(this.state.invitations)}

            </div>
         
          
            <div className="friend-requests-container">
            <h2 className="u-bold">Friends</h2>
                {this.friendsContent(this.state.friendList)}
            </div>

          
            <div className="friend-requests-container">
              <h2 className="u-bold"> Bookclub invitations</h2>
                {this.bookclubInvitationContent(this.state.bookclubInvites)}

            </div>
            </div>

          

            <div className="books-section">
            <button className="book-button" onClick={this.goToLibrary}>Go To Library</button>
            <button className="book-button bookclubs blue-text" onClick={this.goToBookclubs}>Go To Bookclubs</button>
            <button className="book-button" onClick={this.goToAddBookclubs}>Create Bookclubs</button>
            <button className="book-button" onClick={this.goToLibrary}>Go To Community</button>



            </div>
            </div>

              </div>
              
    );
  }
}

export default PersonalPage;

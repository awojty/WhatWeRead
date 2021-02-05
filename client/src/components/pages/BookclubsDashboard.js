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
import "./BookclubsDashboard.css";

import { navigate, Router, Redirect, Route } from "@reach/router";



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
        bookclubs:[]

    };
  }


  bookclubItem = (bookclub, index) => {
      console.log("bookclub", bookclub);
      
    return (
      <div className = "createnew-wrapper">
        <p>{bookclub.book_title}</p>
      <div className="entry-container" onClick={()=>this.goToBookclub(bookclub._id)}>

      </div>
      </div>
    );
  }

  goToBookclub=(bookclub_id)=>{
      let url = "/bookclub/" + bookclub_id;
      navigate(url);

  }


  getBookclubs = async () => {
    const body = { user_id: this.props.userId };
    const goalObjs = await get("/api/getbookclubs", body);
    return goalObjs;
  };



   componentDidMount() {
    this.getBookclubs().then((goalObjs) => {

        console.log("INV" + goalObjs);
        this.setState({
          bookclubs: goalObjs,
        });
      });
        }
  


  handleChangeBookcaseTitle = (event) => {
    this.setState({ title: event.target.value, });
  };

  



  goToLibrary =() =>{
      navigate("/home");
  }

  goToBookclubs =() =>{
    navigate("/bookclubs");
}


goToNewBookclub =() =>{
  navigate("/addbookclub");
}




  render() {
    console.log(this.state);
    return (
        <div className="app">
          <NavBar/>
         


            

            <div className="bookclubs-container">
              <div className="createnew-wrapper" onClick={this.goToNewBookclub}>
                <p> Create New BookClub</p>
            <div className="createnew-container" onClick={this.goToLibrary}></div>
            </div>

            <div className="createnew-wrapper">
                <p> Go to library</p>
            <div className="gotolibrary-container" onClick={this.goToLibrary}>
              
            
            </div>



            </div>
            
           
                {this.state.bookclubs.map((bookclub,key)=>{
                    return(this.bookclubItem(bookclub,key));
                })}

            
            



            
            </div>
            <div className="floor"></div>




              </div>
              
    );
  }
}

export default PersonalPage;

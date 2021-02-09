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


import ProfileNavBar from "../modules/ProfileNavBar";



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
        <p>{bookclub.bookclub_title}</p>
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


  getBookclubsMember = async () => {
    //get bookclubs you belong to but you are not the owner of
    const body = { user_id: this.props.userId };
    const goalObjs = await get("/api/getbookclubsyoubelong", body);

    console.log("i belogn to", goalObjs);
    return goalObjs;
  };


  getClubInfo = async (id) =>{

    const body = { _id: id };
    const goalObjs = await get("/api/getbookclub", body);

    console.log("i belogn to", goalObjs);
    return goalObjs;


  }




   componentDidMount() {
    this.getBookclubs().then((goalObjs) => {
      this.setState({
        bookclubs: goalObjs,
      });

      console.log(goalObjs);

      this.getBookclubsMember().then((memberClub) =>{
        console.log("i belong to those clubs", memberClub);
        
        for(let i=0; i<memberClub.length; i++){
          console.log("hello ", i);

          this.getClubInfo(memberClub[i].bookclub_id).then((club)=>{

            console.log("get actual club", club);
            this.setState({
              bookclubs: goalObjs.concat(club),
            });

          });

        }

      })

        console.log("INV" + goalObjs);

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
                <div className="fixed-container">
      <ProfileNavBar name={this.props.name}/>
      </div>
         


            

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

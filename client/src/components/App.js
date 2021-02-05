import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import CreateBook from "./pages/CreateBook.js";
import CreateBookcase from "./pages/CreateBookcase.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities.js";

import HomeDashboard from "./pages/HomeDashboard.js";
import HomePage from "./pages/HomePage.js";
import CommunityPage from "./pages/CommunityPage.js";
import PersonalPage from "./pages/PersonalPage.js";
import BookclubCreate from "./pages/BookclubCreate";
import BookClub from "./pages/BookClub";
import LandingPage from "./pages/LandingPage";

import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";

import BookclubsDashboard from "./pages/BookclubsDashboard.js";

import ImagePage from "./pages/ImagePage";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      name:undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ 
          userId: user._id,
          name:user.name
         });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;

    post("/api/login", { token: userToken }).then((userObj) => {
      console.log("user is new: " + userObj.isNewUser);
      this.setState({ userId: userObj.user._id });
      if (userObj.isNewUser) {
        console.log("user is new");
        this.createInitialBookcase().then((book)=>{
          console.log("bookcas init ", book)
          navigate("/");

        });
       
      } else {
        navigate("/start");
      }

     
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout").then(() => {
      navigate("/");
    });
  };

  createInitialBookcase = async () => {
    let body = {
      user_id:this.state.userId,
      title:"read"
    }

    let response = await post("/api/createbookcase",body);
    return response;
  }

  render() {
    const isLoggedIn = this.state.userId != null;
    console.log(isLoggedIn);
    
    if (isLoggedIn){
      console.log("islogged in ");
      
    return (
      <>
        <Router>

        <BookclubCreate
              path="/addbookclub"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
              name={this.state.name}
                        
          />

        <TeamPage
              path="/team"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
              name={this.state.name}            
          />

          <AboutPage
              path="/about"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
              name={this.state.name}            
          />

          <ImagePage
           path="/image"
          
          />



          <PersonalPage
              path="/start"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
              name={this.state.name}
                        
          />
          <LandingPage
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          <CreateBook
            path="/addbook"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />

        <HomeDashboard
            path="/home"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />

          <CreateBookcase
            path="/addbookcase"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />

          <CommunityPage
            path="/community"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />

        <BookclubsDashboard
            path="/bookclubs"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />   
        <BookClub
            path="/bookclub/:bookclub_id"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />  
          <NotFound handleLogin={this.handleLogin} handleLogout={this.handleLogout} default />
        </Router>
      </>)}else{
        console.log("is not logged in");
        return(          
        <>
          <Router>
          <TeamPage
              path="/team"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
              name={this.state.name}            
          />

          <AboutPage
              path="/about"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
              name={this.state.name}            
          />

          <LandingPage
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          <NotFound  default />

          </Router>
      </>);



      }
  
  }
}

export default App;

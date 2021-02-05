import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Bookcase from "../modules/Bookcase.js";
import '../modules/App.css';
import "../../utilities.css";
import "./Skeleton.css";
import Painting from "../modules/Painting.js";

import { SketchPicker } from 'react-color';
import { CirclePicker } from 'react-color';
import { navigate, Router, Redirect, Route } from "@reach/router";



import { get, post } from "../../utilities.js";


import "./CreateBook.css";
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class HomePage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {


    };
  }





  componentDidMount() {
    // remember -- api calls go here!
  }




  render() {
    console.log(this.state);
    return (
        <div className="App-Container">Hello. this is a homepage

              </div>
              
    );
  }
}

export default HomePage;

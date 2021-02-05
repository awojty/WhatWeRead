import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Bookcase from "../modules/Bookcase.js";
import '../modules/App.css';
import "../../utilities.css";
import "./Skeleton.css";
import Painting from "../modules/Painting.js";
import BookSearch from "../modules/BookSearch";

import { SketchPicker } from 'react-color';
import { CirclePicker } from 'react-color';
import { navigate, Router, Redirect, Route } from "@reach/router";



import { get, post } from "../../utilities.js";


import "./CreateBook.css";
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class CreateBookcase extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {

        title:"Title",

    };
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



  componentDidMount() {
    // remember -- api calls go here!
  }

  handleChangeBookcaseTitle = (event) => {
    this.setState({ title: event.target.value, });
  };





  render() {
    console.log(this.state);
    return (
        <div className="App-Container">Hello
        <div>
          <p>
            Name of the bookcase:
            <input
            type="string"
            placeholder={this.state.title}
            onChange={this.handleChangeBookcaseTitle}/>
            
          </p>
        </div>


        <button type="submit" onClick={this.onSubmit}>Submit</button>

              </div>
              
    );
  }
}

export default CreateBookcase;

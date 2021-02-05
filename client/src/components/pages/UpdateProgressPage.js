//how longs did you spend today completing yor task ? >> write time in minutes and hours 
// in the abckend update the progress in the given task and eventually change the mood of the cat 

//todo, also seeing some graphics that shows progress would be a nice touch 

import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { navigate, Router, Redirect, Link } from "@reach/router";
import { calculateQuantCatPercentage } from '../../logTimeProgressFunctions.js';

import NavBar from "../modules/NavBar.js";
import CreateCat from "../modules/CreateCat.js";
import GoalsCategories from "../modules/GoalsCategories";
import ProgressBar from "../modules/ProgressBar.js";
import CatComponent from "../modules/CatComponent.js";

import "../../utilities.css";
import "./Skeleton.css";
import "./HomePage.css";
import "./CreateGoal.css";
import "./GoalsDashboard.css";
import "./HomeDashboard.css";
import "./ViewGoal.css";
import Confetti from 'react-confetti';

import { get, post } from "../../utilities.js";

const GOOGLE_CLIENT_ID = "414432801514-87gso51893g2t24f4j957c3i68i71l65.apps.googleusercontent.com";

class UpdateProgressPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
        user_id: "",
        title: "",
        completed_pages: null,
        remaining_pages: 0,
        total_pages: null,
      };

      console.log(this.props);
  }

  goToEdit = () => {
    let url = "/editquantgoal/" + this.props._id;
    navigate(url);
  }

  goToGoals = () => {
    let url = "/home";
    navigate(url);
  }

  handleChangeProgress = (event) => {
    this.setState({
      quantity: event.target.value,
    });

  }

  countChallengeQuantity = (today,start_date, end_date) => {
    console.log("countQuantity");
    let newdate2 = new Date(end_date);

    let time_difference = newdate2.getTime() - today.getTime();  
    console.log("today, start_date, end_date,", today, start_date, end_date)
  
    let days_difference = time_difference / (1000 * 60 * 60 * 24); 
    return days_difference
  };

  countTotalDays = (start_date, end_date) => {
    let time_difference = new Date(end_date).getTime() - new Date(start_date).getTime();  
    let total_days = time_difference/ (1000 * 60 * 60 * 24);
    return total_days;
  }

  
  componentDidMount() {
    // remember -- api calls go here!
    const body = {
      _id: this.props._id,
    };

   
  }


  submitProgress = () => {
    let body = {
      book_id : this.props._id,
      user_id: this.props.userId,
      completed_pages: this.state.quantity,
      remaining_pages: 0,
    };

    console.log("body to send progress  quant goal is ");
        console.log(body);




    post("/api/updateprogress", body).then((response) =>{

      console.log("returned after progress update is", response);



      

      
    });

  };


  showConfetti = () => {
    return (
      <>
        <span className="u-flexColumn u-flex-alignCenter u-flex-justifyCenter popup-box">
          <Confetti></Confetti>
          <span className="notification-style">
            <p className="congrats-styling u-bold">Congrats on completing your goal!</p>
            <button onClick={this.goToGoals} className= "congrats-button">Go to goals</button>
          </span>
        </span>
      </>
    );
  }

  render() {
    return (
      <>
        <div>


          {this.state.show_confetti? this.showConfetti():null}
          
          <div className="app-container">
            <div className="u-column-layout u-full-width">
              <h1>Log progress on your {this.state.title} goal</h1>
              <div className="boxes-container">
                <div className="u-0">
                  <div className="cat-container">
                    <p>How much book you have completed ? </p>
                    <ProgressBar completed={this.state.quantity_completed} remaining ={this.state.quantity_remaining} />
                  </div>
                </div>

                <div className="u-1 u-padding-left-20">
                  <div className="settings-container">
                    <div className="form-item">
                      <span className="new-goal-title">{this.state.title}</span>
                    </div>
                    <table>
                      <tbody>
                          <tr><p className="prompt-text">How many times did you complete your challenge today?</p></tr>
                        <tr>
                          <td>                    
                            <input
                              type="number"
                              placeholder={"enter a number"}
                             value={this.state.quantity}
                              onChange={this.handleChangeProgress}
                              className="form-item new-goal-title" />
                          </td>
                          <td>
                            <select
                              onChange={this.handleClickCategories}
                              className="u-fit-content u-inline u-margin-left-20"
                              name="category"
                              id="category-select" >
                              
                              <option value="times">{this.state.quantity_unit}</option>
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="button-container">
                      <button className="done-button u-margin-right-20" onClick={this.submitProgress} >Save</button>
                     
                    </div>
                  </div>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UpdateProgressPage;
import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { navigate } from "@reach/router";


import "../../utilities.css";
import "./Skeleton.css";

import ProfileNavBar from "../modules/ProfileNavBar";


import "./CommunityPage.css";

import { get } from "../../utilities.js";

import PersonComponent from "./../modules/PersonComponent.js";
import NavBar from "../modules/NavBar";

const GOOGLE_CLIENT_ID = "414432801514-87gso51893g2t24f4j957c3i68i71l65.apps.googleusercontent.com";

class CommunityPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      users: ["blob"],
      categories:{},
      userGoals:{},
      timeBasedGoals: [],
      quantityBasedGoals: [],
      userIds:[],
      userGoalDict:{}

    };
  }

  handleClick = () => {
    this.setState({ selected: !this.state.selected });
  };

  handleFilter = (selectedCategories) => {
    this.setState({ selectedCategories: selectedCategories });
  };

  handleDelete = (deleted_id) => {
    this.setState((prevState) => ({
      timeBasedGoals: prevState.timeBasedGoals.filter((goal) => goal._id !== deleted_id),
    }));
    this.setState((prevState) => ({
      quantityBasedGoals: prevState.quantityBasedGoals.filter((goal) => goal._id !== deleted_id),
    }));
  };



  getAllUsers = async () => {

    const body = { user: this.props.userId };
    const goalObjs = await get("/api/users", body);
    return goalObjs;
  };


  filterGoalsByUser = (user_id, goals) => {
    const filteredGoals = goals
      .filter((goalObj) => goalObj.user_id === user_id);
    return filteredGoals;
  }

  componentDidMount() {

        this.getAllUsers().then((Users) => {
          this.setState({ 
            users: Users,
          userIds : Users.map(({_id})=>_id) });

    });
  };


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




  render() {
    return (
      <div>
        <ProfileNavBar name={this.props.name} respondFriend={this.respondFriend}/>


        <div className="app-container">
                  {this.state.userIds.map((user) => {
                    const name = this.state.users.filter((elem) => user === elem._id);
                    const userName = (name.length === 1) ? name[0].name : "NONAME";
                    return (<PersonComponent  name={userName} friendId={user}/>);
                  })}
                
              </div>

      </div>
    );
  }
}

export default CommunityPage;

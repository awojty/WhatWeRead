import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./PersonComponent.css";

import "../../utilities.css";
import "../pages/Skeleton.css";

import { get, post } from "../../utilities.js";

const GOOGLE_CLIENT_ID = "414432801514-87gso51893g2t24f4j957c3i68i71l65.apps.googleusercontent.com";

class PersonComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selected: false,
      totalGoals:[],
      categories:[],
      canAddFriend:true
    };
  }



  handleClick = (event) => {
    this.setState({ selected: !this.state.selected });
    this.props.onClick(this.props.text);
  }




  addFriend = async () => {
    if(this.state.canAddFriend===false){
      return "Already inviited or a friend";
    }

    const body = { 
      friend_id: this.props.friendId,
       friend_name:this.props.name };
    const goalObjs = await post("/api/invitefriend", body);
    this.setState({
      canAddFriend:false,
    });


    console.log(goalObjs);
    return goalObjs;

  };

  checkCanInvite = async () => {
    console.log("im checking friend props", this.props);
    const body = { friend_id: this.props.friendId };
    const goalObjs = await get("/api/caninvite", body);
    return goalObjs;
  };

  componentDidMount() {


        this.checkCanInvite().then((response)=> {

          console.log("resopse", response);
          this.setState({
            canAddFriend:response.response
          })
        });
      

  };



  getName = (name) => {
    return name;
  };

  render() {
    

    return (
      <div className="box-community">
        <div className="avatar"/>
        <div className="header-wrapper">
        <h2>
          {this.getName(this.props.name)}
        </h2>
        <button onClick={this.addFriend} className={`invite-button${
          
          (this.state.canAddFriend===true) ?  ' invite' : ((this.state.canAddFriend===false) ? ' invitation-exists' : ' friends')
          
          
          }`}>
             <div className = "button-font">{

(this.state.canAddFriend===true) ?  "Invite" : ((this.state.canAddFriend===false) ? 'Invite Sent' : 'Friends')}

             
             
             </div>



          </button>
        </div>

      </div>
    );
  }
}

export default PersonComponent;

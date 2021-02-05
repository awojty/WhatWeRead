import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "../pages/Skeleton.css";
import "./NavBar.css"

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class NavBar extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
        <div >
        {this.props.userId ? (
        <div className="navbar">
            <div className="navbar-logo" >LOGO </div>
            <div className="navbar-item">ITEM</div>
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}/>
            </div>
        ) : (

        <div className="navbar">
            <div className="navbar-logo" >LOGO </div>
            <div className="navbar-item" >ITEM </div>
            <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
            />
        </div>
     

        )}

     
                  </div>
                  


        


    );
  }
}

export default NavBar;

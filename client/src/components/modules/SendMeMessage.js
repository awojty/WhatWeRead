import React, { Component } from "react";
import { Router, navigate } from "@reach/router";

import { get, post } from "../../utilities.js";
import Axios from "axios";



class SendMeMessage extends Component {
    constructor(props) {
        super(props);
        // Initialize Default State
        this.state = {
    
            message:"",
            name:""
    
        };
      }

    handleNameChange = (e) =>{
        this.setState({
            name:e.target.value
        });


    }

    handleMessageChange = (e) =>{
        this.setState({
            message:e.target.value
        });


        
    }

    sendMessage = (e) =>{
        let name = "aoskpa";
        let message="message";

        console.log("attempt to send a message");
        Axios({
            method: "POST",
            url: "http://localhost:5000/api/send",
            data: { name, message },
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            if (res.data.msg === "suc") {
              console.log("Email has been sent");
              //setNewMessage(initialInputState);
              return;
            } else {
              console.log("FAILURE");
              return;
            }
          });


    }
    
    render() {
        return (
            <div>
      <div>
       
          <h2>Send a Message</h2>

      </div>


          <form>
            <div>
              <label for="name">Name</label>
              <input
                name="name"
                onChange={this.handleNameChange}
                value={this.state.name}
                placeholder="Enter your name here"
              ></input>
            </div>
            <div>
              <label for="message">Message</label>
              <input
                type="textarea"
                value={this.state.message}
                onChange={this.handleMessageChange}
                style={{ height: 150 }}
                name="message"
                placeholder="What's on your mind?"
              ></input>
            </div>
            {/* <button onClick={this.sendMessage}>Submit</button> */}
            <div>this form does nothing yet</div>
          </form>


    </div>
    );
}}

export default SendMeMessage ;
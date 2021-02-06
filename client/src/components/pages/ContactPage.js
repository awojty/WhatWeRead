import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import SendMeMessage from "../modules/SendMeMessage";
import CustomNavBar from "../modules/CustomNavBar";
import "./ContactPage.css"

class ContactPage extends Component {
    constructor(props) {
        super(props);
        // Initialize Default State
        this.state = {
    
            title:"Title",
            invitations: [],
            friendList: [],
            showLoading: true,
            bookclubInvites:[],
    
        };
      }
    
    render() {
        return (
            <div className="contactpage-container">
                <CustomNavBar/>
                <h1>Hey! I'm Adrianna!</h1>
                <h2>Thanks for visiting my website! </h2>
                <p>I'm EECS student at MIT. This website came from my love for books and web dev </p>
                <p>Feel free to use a message box to contact me! If you want to give any feebad, you can also click on the feedback field above in the navbar. Thanks! </p>

            <SendMeMessage />
            </div>
    );
}}

export default ContactPage ;
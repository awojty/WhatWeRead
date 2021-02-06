import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import SendMeMessage from "../modules/SendMeMessage";

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
            <div className="container">
            <SendMeMessage />
            </div>
    );
}}

export default ContactPage ;
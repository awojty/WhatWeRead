import React, { Component } from "react";


import { get, post } from "../../utilities.js";
import { navigate } from "@reach/router";

import "./BookClubComment.css";


class BookclubComment extends Component {
  constructor(props) {
    super(props);
    this.state={
      bookcases:[], 
  }

}

  componentDidMount() {

    console.log(this.props);
    let body = {
      user_id: this.props.userId,
  
    };






  }



  
  render() {




    return (
      <div className="comment">
          This is a comment
          {this.props.name}
          {this.props.content}
          {/* {this.props.date} */}
          
      </div>
    );
  }}


export default BookclubComment;

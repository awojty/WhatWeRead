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

  getParsedDate(strDate){
    var strSplitDate = String(strDate).split(' ');
    var date = new Date(strSplitDate[0]);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date =  dd + "-" + mm + "-" + yyyy;
    return date.toString();
}

  
  render() {




    return (
      <div className="comment">
        <div className="comment-title">
        <h4 className="smaller-padding">{this.props.name}</h4>
        {this.getParsedDate(this.props.date)}


        </div>
        <div className="comment-content">
        {this.props.content}


        </div>
       

       
         
          
      </div>
    );
  }}


export default BookclubComment;

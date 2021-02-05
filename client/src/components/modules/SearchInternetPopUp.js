import React, { Component } from "react";
import Checkbox from 'react-checkbox';
import { get, post } from "../../utilities.js";
import "./InviteBookclubPopUp.css";
import { navigate, Router, Redirect, Route } from "@reach/router";
import BookSearch from "../modules/BookSearch";

class SearchInternetPopUp extends Component {

    constructor(props) {
        super(props);
        this.state={
        
          title:"Title",
      };
    
    }

handleClick = () => {
        this.props.toggle();
      };





componentDidMount(){
}

handleChangeBookcaseTitle = (event) => {
  this.setState({ title: event.target.value, });
};

onSubmit = () => {

  let body = {

  title: this.state.title,
  user_id:this.props.userId,

  };

  this.props.toggle();

  console.log("bookcase body", body);

  post("/api/createbookcase", body).then((response)=>{
        console.log("response");
        console.log(response);
        let newArray = this.state.bookcases.push(response);
       this.setState({
         bookcases:newArray
       });
      

    });
  


}







render() {

    console.log("HELLO");
    console.log("thisstate", this.state);

    return (
        
<BookSearch handleSelect={this.props.handleSelect} toggle={this.props.toggle}/>
        
      );
    }
 
}


export default SearchInternetPopUp;
import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link, navigate } from "@reach/router";
import { get, post } from "../../utilities.js";
import "../pages/Skeleton.css";
import "../../utilities.css";
import "./BookHoverBox.css";
import ReactStars from "react-rating-stars-component";



import defImg from "../Assets/hello.png";
import ProgressBar from "./ProgressBar";

const GOOGLE_CLIENT_ID = "414432801514-87gso51893g2t24f4j957c3i68i71l65.apps.googleusercontent.com";

class UpdateProgressPopUp extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      showDeleteConfirm: false,
      completeNew:0,
      remainingNew:0,
      quantity:0,
    };
  }

  handleChangeProgress = (event) => {
    this.setState({
      completeNew: Number(event.target.value),
    });

  }




  componentDidMount() {
    // remember -- api calls go here!
    this.setState({
      completeNew:this.props.completed_pages,
     
    })
  }

  showDeleteConfirmButton = () => {
    this.setState({ showDeleteConfirm: true, });
  }

  handleDelete = () => {
    const body = { _id: this.props._id };
    post("/api/deletebook", body).then((goal) => {
        this.setState({ deleted: true }, this.props.handleDelete);
      });

  };

  cancelDelete = () => {
    this.setState({ showDeleteConfirm: false, });
  }

  submitProgress = () => {

    let body = {
      book_id : this.props.book_id,
      
      completed_pages: this.state.completeNew, 
      remaining_pages: this.props.total_paged-this.state.completeNew,
    };

    console.log("body to send progress  quant goal is ");
        console.log(body);




    post("/api/updateprogress", body).then((response) =>{

      console.log("returned after progress update is", response);
      this.props.handleProgressChange(this.state.completeNew,this.props.total_paged-this.state.completeNew);




      

      
    });

  };


  render() {
    console.log("update progress props", this.props);

    console.log("state", this.state);
    


    return (
      <>
        <div className="bookcase-hoverbox">
        <span className="close" onClick={()=>this.props.closeProgressPopUp()}>
              &times;
            </span>
            <input
            type="number"
            placeholder={this.props.completed_pages}
            // value={this.state.completeNew}
            onChange={this.handleChangeProgress}
            >
            </input>
          <div>{this.props.title}</div>
          <div>{this.props.author}</div>
         <ProgressBar total={this.props.total_pages} completed={this.state.completeNew}/>
         <img className="book-cover-popup" src={this.props.image}></img>
         <button onClick={this.submitProgress}>Update progress</button>

          </div>
      </>
    );
  }
}

export default UpdateProgressPopUp;

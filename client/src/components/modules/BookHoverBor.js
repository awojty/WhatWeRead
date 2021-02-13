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

class BookHoverBox extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      showDeleteConfirm: false,
    };
  }


  hoverbox = (deleteConfirmButton, progressGoal, reviewGoal, deleteGoal,inviteGoal,movebookcaseGoal) => {
      if (this.state.showDeleteConfirm) {
        return deleteConfirmButton;
      } else {
        return (
          <>
            {progressGoal}
            {reviewGoal}
            {inviteGoal}
            {deleteGoal}
            {movebookcaseGoal}

          </>
        );
      }
    };

  componentDidMount() {
    // remember -- api calls go here!
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

  render() {
    console.log("hoverbox props", this.props);
    const progressUrl =  "/updatebookprogress/"+ this.props._id;

    const progressGoal = (
      <Link to={progressUrl} className="navbar-text noselect hoverbox-text">
        Update Progress
      </Link>
    );

    const reviewUrl = "/reviewbook/" + this.props._id;

    const reviewGoal = (
      <Link to={reviewUrl} className="navbar-text noselect hoverbox-text"
      >
        Review book
      </Link>
    );


    const inviteUrl = "/invitefriendtobook/" + this.props._id;

    const inviteGoal = (
      <Link to={inviteUrl} className="navbar-text noselect hoverbox-text"
      >
        Invite friend to read 
      </Link>
    );

    const movebookcaseUrl = "/invitefriendtobook/" + this.props._id;

    const movebookcaseGoal = (
      <Link to={movebookcaseUrl} className="navbar-text noselect hoverbox-text"
      >
        Move to another bookcase 
      </Link>
    );


    const deleteConfirmButton = (
      <>
        <p className="u-red u-margin-top-0 u-margin-bottom-0">
          Are you sure? Deleting a book is irreversible.
        </p>
        <a className="u-bold navbar-text hoverbox-text noselect" onClick={this.cancelDelete}>
          Cancel
        </a>
        <Link to="/goals" className="u-bold navbar-text noselect delete-text" onClick={this.handleDelete}>
          Delete
        </Link>
      </>
    );

    const deleteGoal = (
        <a className="navbar-text noselect delete-text" onClick={this.showDeleteConfirmButton}>Delete Goal</a>
      );



    return (
      <>
        <div className="bookcase-hoverbox">
        <span className="close" onClick={this.props.handleBookClick}>
              &times;
            </span>
          {this.hoverbox(deleteConfirmButton, progressGoal, reviewGoal, deleteGoal, inviteGoal, movebookcaseGoal)}
          <div>{this.props.title}</div>
          <div>{this.props.author}</div>
         <ProgressBar total={this.props.total_pages} completed={this.props.completed_pages}/>
         <img className="book-cover-popup" src={this.props.image}></img>
         <button onClick={()=>this.props.toggleProgress()}>Updateprogressbook</button>
         <button onClick={()=>this.props.toggleMoveBookcase()}>Change bookcase</button>
         <ReactStars
    count={5}
    ratingChanged={()=>console.log("rating")}
    
    size={24}
    activeColor="#ffd700"
  />,
          </div>
      </>
    );
  }
}

export default BookHoverBox;

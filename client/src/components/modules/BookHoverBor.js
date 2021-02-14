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


  hoverbox = (deleteConfirmButton,  reviewGoal, deleteGoal) => {
      if (this.state.showDeleteConfirm) {
        return deleteConfirmButton;
      } else {
        return (
          <>
           
            {reviewGoal}
          
            {deleteGoal}
           

          </>
        );
      }
    };

    

    onPressInvite = () => {

    }

  componentDidMount() {
    // remember -- api calls go here!

    //this.setState({stars:this.props.stars})

    let body = {
      book_id:this.props.book_id
    }

    console.log("body", body);

    

    get("/api/getareview", body).then((res)=>{

      console.log("res", res)
      this.setState({
        stars:res.stars,
        review:res.content
      });
    })
  }

  showDeleteConfirmButton = () => {
    this.setState({ showDeleteConfirm: true, });
  }

  handleDelete = () => {
    console.log("DELETE Hover props", this.props);
    const body = { book_id: this.props.book_id };
    post("/api/deletebook", body).then((goal) => {
        console.log("goal", goal);
        this.props.handleDelete();

      });

  };

  cancelDelete = () => {
    this.setState({ showDeleteConfirm: false, });
  }

  returnStars = () =>{
    console.log("returnStars", this.state.stars);
    return(<ReactStars
      count={5}
      edit={false}
      
      value={this.state.stars}
    
      
      size={24}
      activeColor="#ffd700"
    
    />)
  }

  render() {
    console.log("hoverbox props", this.props);
    console.log("state", this.state);

    const Star= this.props.stars;

    console.log("star in hove", Star);
    const progressUrl =  "/updatebookprogress/"+ this.props._id;



    const reviewUrl = "/reviewbook/" + this.props.book_id;

    const reviewGoal = (
      <Link to={reviewUrl} className="navbar-text noselect hoverbox-text"
      >
        Review book
      </Link>
    );


    const deleteConfirmButton = (
      <>
        <p className="u-red u-margin-top-0 u-margin-bottom-0">
          Are you sure? Deleting a book is irreversible.
        </p>
        <a className="u-bold navbar-text hoverbox-text noselect" onClick={()=>console.log("cance")}>
          Cancel
        </a>
        <a  className="u-bold navbar-text noselect delete-text"  href="javascript:window.location.reload(true)" onClick={this.handleDelete}>Delete</a>

      </>
    );

    const deleteGoal = (
        <a className="navbar-text noselect delete-text" onClick={this.showDeleteConfirmButton}>Delete Goal</a>
      );



    return (
      <>
        <div className="bookcase-hoverbox">
        <span className="close" onClick={this.props.handleCloseClick}>
              &times;
            </span>
          {this.hoverbox(deleteConfirmButton, reviewGoal, deleteGoal)}
          <div>{this.props.title}</div>
          <div>{this.props.author}</div>
         <ProgressBar total={this.props.total_pages} completed={this.props.completed_pages}/>
         <img className="book-cover-popup" src={this.props.image}></img>
         <button onClick={()=>this.props.toggleProgress()}>Update progress</button>
         <button onClick={()=>this.props.toggleMoveBookcase()}>Change bookcase</button>
         <button onClick={this.handleDelete}>Delete</button>
         <button onClick={()=>this.props.onFinishBook()}>Finish Book</button>
         {this.state.stars!==undefined ? this.returnStars():null}
          </div>
      </>
    );
  }
}

export default BookHoverBox;

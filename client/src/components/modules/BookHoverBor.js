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
          <div>
           
            {reviewGoal}
          
            {deleteGoal}
           

          </div>
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

  hideDeleteConfirmButton = () => {
    this.setState({ showDeleteConfirm: false, });
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
    console.log("BOOOKTITLE bookhoverstate", this.state);

    const Star= this.props.stars;

    console.log("star in hove", Star);
    const progressUrl =  "/updatebookprogress/"+ this.props._id;



    const reviewUrl = "/reviewbook/" + this.props.book_id;

    const reviewGoal = (
      <div>
      <Link to={reviewUrl} className="navbar-text noselect hoverbox-text"
      >
        Review book
      </Link>
      </div>
    );


    const deleteConfirmButton = (
      <>
        <p className="u-red u-margin-top-0 u-margin-bottom-0">
          Are you sure? Deleting a book is irreversible.
        </p>
        <a className="u-bold navbar-text hoverbox-text noselect" onClick={this.hideDeleteConfirmButton}>
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
            <div className="popup-divider">
              <div className="book-info-section">
                <div className="name-section">
                  <div className="title-section u-bold">Author </div>
                  <div className="title-section">{this.props.author}</div>
                  </div>

                  <div className="name-section">
                  <div className="title-section u-bold">Title </div>
                  <div className="title-section ">{this.props.title}</div>
                  </div>
              
               
              <ProgressBar width="250px" total={this.props.total_pages} completed={this.props.completed_pages}/>
              <img className="book-cover-popup" src={this.props.image}></img>
              {this.state.stars!==undefined ? this.returnStars():null}



              </div>

              <div className="function-section">

              {this.hoverbox(deleteConfirmButton, reviewGoal, deleteGoal)}
              <button onClick={()=>this.props.toggleProgress()}>Update progress</button>
              <button onClick={()=>this.props.toggleMoveBookcase()}>Change bookcase</button>
              <button onClick={this.handleDelete}>Delete</button>
              <button onClick={()=>this.props.onFinishBook()}>Finish Book</button>

              </div>

            </div>

          </div>
      </>
    );
  }
}

export default BookHoverBox;

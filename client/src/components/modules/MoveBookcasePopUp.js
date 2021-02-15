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

class MoveBookcasePopUp extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      showDeleteConfirm: false,
      bookcase:"",
      bookcases:[],
    };
  }

  handleChangeProgress = (event) => {
    this.setState({
      completeNew: event.target.value,
    });

  }


  componentDidMount() {
    // remember -- api calls go here!
    let body = {
      user_id:this.props.userId
    }

    get("/api/getuserbookcases", body).then((bookcases)=>{
      console.log("bookcases,found", bookcases);
      this.setState({
        bookcases:bookcases
      })
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
      bookcase: this.state.bookcase, 
    };

    console.log("body to send progress  quant goal is ");
        console.log(body);

    post("/api/movebookcase", body).then((response) =>{

      console.log("returned after progress update is", response);



      

      
    });

  };

  handleSelectBookcase = (event) => 
  {
    this.setState({
      bookcase:event.target.value
    });
  }


  render() {
    console.log("update progress props", this.props);

    console.log("state", this.state);
    


    return (
      <>
        <div className="bookcase-hoverbox">
        <span className="close" onClick={()=>this.props.closeProgressPopUp()}>
              &times;
            </span>


          <select defaultValue = "Sort" onChange={this.handleSelectBookcase}>
                {this.state.bookcases.map((bookcase)=>{
                  return( <option value={bookcase.titel}>{bookcase.title}</option>);
                })}

              </select>


         <img className="book-cover-popup" src={this.props.image}></img>
         <button onClick={this.submitProgress}>Update book</button>

          </div>
      </>
    );
  }
}

export default MoveBookcasePopUp;

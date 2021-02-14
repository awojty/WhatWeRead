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

class FinishBookPopUp extends Component {
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
        <span className="close" onClick={()=>this.props.toggleProgress()}>
              &times;
            </span>


            <p className="congrats-styling u-bold">Congrats on completing your goal!</p>
          <p className="congrats-styling u-bold">Do you want to review the book?</p>
          <button  className= "congrats-button" onClick={() => {navigate("/reviewbook/"+this.props.book_id)}}>Review</button>
          <button  className= "congrats-button" onClick={() => {navigate("/home")}}>Go back to library</button>


          </div>
      </>
    );
  }
}

export default FinishBookPopUp;

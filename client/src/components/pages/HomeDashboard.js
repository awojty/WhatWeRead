import React, { Component } from "react";



import "../pages/Skeleton.css";
import './HomeDashboard.css';
import bookcase from "../Assets/Bookcase.png";
import Bookcase from "../modules/Bookcase.js";
import { get, post } from "../../utilities.js";
import { navigate } from "@reach/router";
import NavBar from "../modules/NavBar";
import "./BookclubsDashboard.css";
import AddBookcasePopUp from "../modules/AddBookcasePopUp";
import ProfileNavBar from "../modules/ProfileNavBar";

import BookHoverBox from "../modules/BookHoverBor";

import defImg from "../Assets/hello.png";
import UpdateProgressPopUp from "../modules/UpdateProgressPopUp";
import MoveBookcasePopUp from "../modules/MoveBookcasePopUp";




/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} content of the comment
 */


class HomeDashboard extends Component {
  constructor(props) {
    super(props);
    this.state={
      bookcases:[], 
      addBookcase:false,
      title:"title",
      selected_title:"",
      selected_color: "",
      selected_author: "",
      selected_id: "",
      showBookPopUp: false,
      total_pages: 100,
      completed_pages: 0,
      image:defImg,
      showUpdateProgressPopUp:false,
      showMoveBookcasePopUp:false,
  }

}

onChangeTitle = (event) => {
  this.setState({ title: event.target.value, });
};

  componentDidMount() {

    console.log(this.props);
    let body = {
      user_id: this.props.userId,
  
    };



    get("/api/getuserbookcases",body).then((bookcases)=>{

      console.log("bookcases found", bookcases)
      this.setState({
        bookcases:bookcases,
      });

    })



  }

  onSubmit = () => {

    let body = {
  
    title: this.state.title,
    user_id:this.props.userId,
  
    };
  
    console.log("bookcase body", body);
  
    post("/api/createbookcase", body).then((response)=>{
          console.log("response");
          console.log(response);
          let newArray = this.state.bookcases.concat([response]);
         this.setState({
           bookcases:newArray
         });
  
      })
  
  
  }

  goToAddBook = () =>{
    navigate("/addbook");
  }

  goToAddShelf = () =>{
    navigate("/addbookcase");
  }

  goToAddFriends = () =>{
    navigate("/community");
  }

  goToBookclubs=()=>{
    let url = "/bookclubs";
    navigate(url);

}

togglePop = () => {
  this.setState({
    addBookcase: !this.state.addBookcase
  });
};

changeAddBookcase = () => {
  this.setState({
    addBookcase:!this.state.addBookcase
  });
}

handleBookClick = (title,color,author,id, total_pages, completed_pages, image) => {

  this.setState({
    selected_title: title,
    selected_color: color,
    selected_author: author,
    selected_id: id,
    showBookPopUp:!this.state.showBookPopUp,
    total_pages: total_pages,
    completed_pages: completed_pages,
    image:image

  })
}

toggleProgress = () => {
  this.setState ( {
    showUpdateProgressPopUp: !this.state.showUpdateProgressPopUp,
    showBookPopUp:false,
    showMoveBookcasePopUp:false,

  })
}


toggleMoveBookcase = () => {
  this.setState ( {
    showMoveBookcasePopUp: !this.state.showMoveBookcasePopUp,
    showUpdateProgressPopUp:false,
    showMoveBookPopUp:false,

  })
}







  
  render() {

    console.log("ststae", this.state.bookcases);

    console.log("stateHome", this.state);


    return (

      <div className="app">
      {/* <NavBar/> */}
      <div className="spacer"></div>
      {this.state.showBookPopUp ? 
      <BookHoverBox 
      toggleProgress={this.toggleProgress}
      handleBookClick={this.handleBookClick}
      toggleMoveBookcase={this.toggleMoveBookcase}
      book_id={this.state.selected_id}

        title={this.state.selected_title} 
        _id={this.props._id}
        author = {this.state.selected_author}
        completed_pages={this.state.completed_pages}
        total_pages={this.state.total_pages}
        image={this.state.image}
        />:null}

{this.state.showUpdateProgressPopUp ? 
      <UpdateProgressPopUp
      toggleProgress={this.toggleProgress}
      handleBookClick={this.handleBookClick}
        title={this.state.selected_title} 
        _id={this.props._id}
        book_id={this.state.selected_id}
        author = {this.state.selected_author}
        completed_pages={this.state.completed_pages}
        total_pages={this.state.total_pages}
        image={this.state.image}
        />:null}

{this.state.showMoveBookcasePopUp ? 
      <MoveBookcasePopUp
      toggleProgress={this.toggleMoveBookcase}
      toggleMoveBookcase={this.toggleMoveBookcase}
      handleBookClick={this.handleBookClick}
        title={this.state.selected_title} 
        _id={this.props._id}
        book_id={this.state.selected_id}
        author = {this.state.selected_author}
        completed_pages={this.state.completed_pages}
        total_pages={this.state.total_pages}
        image={this.state.image}
        />:null}

      <div className="fixed-container">
      <ProfileNavBar name={this.props.name}/>
    

      </div>
    

        <div className="bookclubs-container">
      

       
            {this.state.bookcases.slice(0,2).map((bookcase,i)=>{
         return(<Bookcase key = {i} _id={bookcase.user_id} title={bookcase.title} handleBookClick={this.handleBookClick}/>);

            })}

     <div className="paintings-container">
            <button className="painting-wrapper" onClick={this.goToAddBook}>Add new book</button>
             <button className="painting-wrapper" onClick={this.changeAddBookcase}>Add new bookcase</button>
            <button className="painting-wrapper" onClick={this.goToAddFriends}>Add friends</button>
     </div>
     {this.state.addBookcase ? <AddBookcasePopUp title={this.state.title} onChangeTitle={this.onChangeTitle}toggle={this.togglePop} userId={this.props.userId} onSubmit={this.onSubmit}/> : null}
     <div className = "createnew-wrapper">
        <p>Go to bookclubs</p>
      <div className="entry-container" onClick={this.goToBookclubs}>

      </div>

      </div>

      {this.state.bookcases.slice(2).map((bookcase,i)=>{
         return(<Bookcase key = {i} _id={bookcase.user_id} title={bookcase.title} handleBookClick={this.handleBookClick}/>);

            })}


        
        </div>
        <div className="floor"></div>




          </div>
    );
  }}


export default HomeDashboard;

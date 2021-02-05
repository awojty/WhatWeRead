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
      title:"title"
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







  
  render() {

    console.log("ststae", this.state.bookcases);


    return (
      // <div className="homedashboard-container">
      //   {/* <div className="top-container"></div> */}
      //   <div className="stuff-container">
      //     {/* <div className="bookcases-container"> */}
              
      //         {this.state.bookcases.map((bookcase, i )=>{
      //           return(<Bookcase key = {i} _id={bookcase.user_id} title={bookcase.title}/>);
      //         })}
             
              
      //     {/* </div> */}
      //     <div className="paintings-container">
      //       <button className="painting-wrapper" onClick={this.goToAddBook}>Add new book</button>
      //       <button className="painting-wrapper" onClick={this.goToAddShelf}>Add new bookcase</button>
      //       <button className="painting-wrapper" onClick={this.goToAddFriends}>Add friends</button>
      //     </div>
      //     <button className="door-component"></button>
      //     </div>
      //     <div className="floor-container"></div>
          
      // </div>

      <div className="app">
      <NavBar/>
    

        <div className="bookclubs-container">

       
            {this.state.bookcases.slice(0,2).map((bookcase,i)=>{
         return(<Bookcase key = {i} _id={bookcase.user_id} title={bookcase.title}/>);

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
         return(<Bookcase key = {i} _id={bookcase.user_id} title={bookcase.title}/>);

            })}

      

        
        



        
        </div>
        <div className="floor"></div>




          </div>
    );
  }}


export default HomeDashboard;

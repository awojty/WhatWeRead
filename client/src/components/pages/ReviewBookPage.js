import React, { Component } from "react";

import { get, post } from "../../utilities";

import Calendar from 'react-calendar'

import { navigate } from "@reach/router";


import ReactStars from "react-rating-stars-component";
import ProfileNavBar from "../modules/ProfileNavBar";
/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} content of the comment
 */
class ReviewBookPage extends Component {
  constructor(props) {
    super(props);
    this.state={
        color: "#aaa",
        title: "t",
        author: "autho",
        book_id: "",
        image:"",
        user_id:"",
        review:"",
        stars:0,

        

    }
  }

  getBook = async () =>{
      let body = {
          book_id:this.props.book_id
      }

      console.log("this is body ", body);
      let book = await get("/api/getbook", body);

      console.log("i got a book", book);
      return book; 

  }
  componentDidMount(){

    console.log("book mount props", this.props);

    console.log(this.props);
    this.setState({
      book_id:this.props.book_id,
    });

    this.getBook().then((book)=>{
        let aBook = book;
        this.setState({

            color: aBook.color,
            title: aBook.title,
            author: aBook.author,
            book_id: aBook._id,
            image: aBook.image,

        })
    })

  }

  changeReview = (e) => {
      console.log("naos");
      this.setState({
          review:e.target.value

      })
  };

  onSubmit= () =>{
      let body = {

        book_title: this.state.title,
        book_author: this.state.author,
        book_id: this.state.book_id,
        user_name: this.props.name,
        stars: this.state.stars,
        content: this.state.review,
      
     };

     post("/api/reviewbook", body).then((res)=>{
         console.log("rs",res);
         navigate("/home");
     })

  }

  ratingChange = (e) => {
      console.log("AWdsad", e);
      this.setState({
          stars:e
      })
  }



  render() {

    console.log(this.state);

    return (
      <div>
           <ProfileNavBar name={this.props.name} respondFriend={this.respondFriend}/>
          <textarea
          type="text"
          onChange={this.changeReview}
          value={this.state.review}
          placeholder="You review..."
          ></textarea>

          <ReactStars
                count={5}
                onChange={this.ratingChange}

                size={24}
                activeColor="#ffd700"
          
          />
         <div>{this.state.author}</div>
         <div>{this.state.title}</div>
          <img src={this.state.image}></img>
          <button onClick={this.onSubmit}>Submit</button>

       

            
      </div>
        )};
        
        
    
  
}

export default ReviewBookPage;

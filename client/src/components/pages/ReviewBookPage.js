import React, { Component } from "react";

import { get } from "../../utilities";

import Calendar from 'react-calendar'


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

  componentDidMount(){

    console.log("book mount props", this.props);

    console.log(this.props);
    this.setState({
      book_id:this.props.book_id,
    });

    let body = {
      _id:this.props.book,
    };

    console.log("book book info", body);


  }

  changeReview = (e) => {
      console.log("naos");
      this.setState({
          review:e.target.value

      })
  }

  onSubmit= () =>{
      let body = {

        book_title: this.state.title,
        book_author: this.state.author,
        book_id: this.state.book_id,
        user_name: this.props.name,
        stars: this.state.stars,
        content: this.state.review,
      
     };

  }

  ratingChange = (e) => {
      console.log("AWdsad", e);
      this.setState({
          stars:e
      })
  }



  render() {

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
          <div>Select start date of reading</div>

<Calendar />
<div>Select end date of reading</div>

<Calendar />
       

            
      </div>
        )};
        
        
    
  
}

export default ReviewBookPage;

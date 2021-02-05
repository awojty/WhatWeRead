import React, { Component } from "react";

import request from "superagent";
import SearchArea from "./SearchArea.js";
import book from "../Assets/book.png";
import "./BookCard.css";

class BookCard extends Component {
  constructor(props) {
    super(props); 
    this.state= { 
        selected:false,
        books:[],
        searchField:"", //update teh state while you add the input on the box
    }
  }

  
  handleClick = (event) => {
    this.setState({ selected: !this.state.selected });
    
  }


  render() {

    console.log(this.props);
    

    return (
      <div className={`noselect book-card${this.state.selected ?  ' selected' : ''}`} 
      onClick={this.props.onClick}>
          <img className="book-image" src={this.props.image} />
          <div className="info-section">
            <h4 className="book-info">Author</h4>

          <h5 className="book-info">{this.props.author}</h5>
          <h4 className="book-info">Title</h4>
          <h5 className="book-info">{this.props.title}</h5>
          <h4 className="book-info">Publication</h4>
          <h5 className="book-info">{this.props.published}</h5>
          </div>

      </div>
    );
  }}


export default BookCard;

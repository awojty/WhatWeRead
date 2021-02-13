import React, { Component } from "react";

import Book from "./Book.js";
import './Shelf.css';
import "../pages/Skeleton.css";




/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} content of the comment
 */
class Shelf extends Component {
  constructor(props) {
    super(props);
    this.state={
      
      bookCovers:[],
    }

  }

  componentDidMount() {
    console.log("shelf props", this.props);


      this.setState({bookCovers: this.props.books});
  



  }


  render() {
    console.log("SHELF");
    console.log("shelf state", this.state);
    console.log("shelf props bruh", this.props);

    return (
      //for each book, pass its id

      <div className="shelf-container">
             {this.state.bookCovers.map((book) => (
               <>
             <Book book={book} handleBookClick={this.props.handleBookClick}/>
            
             </>
             ))}
        
    </div>

    );
  }
}

export default Shelf;

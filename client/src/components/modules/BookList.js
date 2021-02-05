import React, { Component } from "react";

import request from "superagent";
import SearchArea from "./SearchArea.js";
import BookCard from "./BookCard.js";
import "./BookList.css";

class BookList extends Component {
  constructor(props) {
    super(props); 
    this.state= { 
        books:[],
        searchField:"", //update teh state while you add the input on the box
    }
  }



  render() {



    return (
      <div className="book-list">
          {this.props.books.map((book,i)=>{

              return <BookCard 
                        key={i}
                        image= {book.volumeInfo.imageLinks.thumbnail}
                        title= {book.volumeInfo.title}
                        published= {book.volumeInfo.publishedDate}
                        author= {book.volumeInfo.authors}
                        onClick={()=>this.props.handleSelect(book.volumeInfo.title, book.volumeInfo.publishedDate,
                          String(book.volumeInfo.authors), book.volumeInfo.pageCount, book.volumeInfo.imageLinks.thumbnail)}
                         />


          })}
       

   
      </div>
    );
  }}


export default BookList;

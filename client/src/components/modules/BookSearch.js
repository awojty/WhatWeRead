import React, { Component } from "react";

import request from "superagent";
import SearchArea from "./SearchArea.js";
import BookList from "./BookList.js";

import { get, post } from "../../utilities.js";
import "./InviteBookclubPopUp.css";

import "./BookSearch.css";





class BookSearch extends Component {
  constructor(props) {
    super(props); 
    this.state= { 
        books:[],
        searchField:"", //update teh state while you add the input on the box
        sort:""
    }
  }

  handleSearch = (event) => {
      console.log(event.target.value);
      this.setState({
          searchField:event.target.value,
      })
  }

  searchBook = (event)=>{
      event.preventDefault();

      request
      .get("https://www.googleapis.com/books/v1/volumes?")
      .query({q: this.state.searchField}).then((data)=>{
          console.log(data);
          const cleanData = this.cleanData(data);
          this.setState({books:cleanData});
      });


  }

  handleSort = (e) => {
      console.log(e.target.value);
      this.setState({
          sort:e.target.value
      });

  }

  cleanData = (data) =>{
      //clean up the data you get from the API - if book deosnt conatin a propety - use a default value 

        const cleanData = data.body.items.map((book)=>{
            if(book.volumeInfo.hasOwnProperty("publishedDate")===false){
                book.volumeInfo['publishedDate']="0000";
            }
            else if(book.volumeInfo.hasOwnProperty("imageLinks")===false){

                book.volumeInfo["imageLinks"]={thumbnail:"https://www.dreamstime.com/no-image-available-icon-photo-camera-flat-vector-illustration-image132483296"};
            }

            return book;



        })

        return cleanData;



      

  }

  handleClick = () =>{
      console.log(this.props);
    this.props.toggle();
  }

  





  render() {

    return (
      <div className="modal_content resize">
        <span className="close" onClick={this.handleClick}>
              &times;
            </span>
          <SearchArea searchBook={this.searchBook} handleSearch={this.handleSearch} handleSort={this.handleSort}/>
          <BookList books = {this.state.books} handleSelect={this.props.handleSelect}/>
        
      </div>
    );
  }}


export default BookSearch;

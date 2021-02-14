import React, { Component } from "react";

import Shelf from "./Shelf.js";
import './App.css';
import "../pages/Skeleton.css";
import { get, post } from "../../utilities.js";
import "./Bookcase.css";

/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} content of the comment
 */


class Bookcase extends Component {
  constructor(props) {
    super(props);
    this.state={
      Books:[],
      bookIds:[],
      shelves:[],
      
  }}

  componentDidMount() {

    let body ={
      user_id:this.props._id,
      title:this.props.title,
    };
    console.log("BOOKTITLE" ,body);

    get("/api/getbooksforbookcase", body).then((book)=>{
      console.log("books for a given case", book);

      const ids = this.createIdsList(book);
      const Shelves = this.divideArrayIntoShelfs(book);
      console.log("shelvsd", Shelves)
      this.setState({
        Books: book,
        bookIds: ids,
        shelves: Shelves,
      });
    })


  }

  createIdsList = (booksList) =>{
    //return lsit of ids of boooks that belong to the user

    console.log("booksList bookcase", booksList);
    let idsList = [];
    for(let i=0;i<booksList.length;i++){
      let id = booksList[i]._id;
      idsList.push(id);
    };

    console.log("result create ids lsit", idsList);

    return idsList;

  }


  returnShelf = (shelf) => {

    console.log("state before return shelf", this.state);
    console.log("input int the returhShelf function", shelf);

    return ( <Shelf books={shelf}/>);
  }

  divideArrayIntoShelfs = (array) => {
    let shelves = [];
    let shelfLength = 10; //constant
    while(array.length) {
      shelves.push(array.splice(0,shelfLength));
    }

    return shelves;
  }

  getBooks = () => {

    let body ={
      user_id:this.props._id,
      title:this.props.title,
    };
    console.log("bookcase body" ,body);

    get("/api/getbooksforbookcase", body).then((book)=>{
      console.log("books for a given case", book);

      const ids = this.createIdsList(book);
      const Shelves = this.divideArrayIntoShelfs(book);
      console.log("shelvsd", Shelves)
      this.setState({
        Books: book,
        bookIds: ids,
        shelves: Shelves,
      });
    })


  }





  
  render() {
    console.log("props in the bookcase", this.props);
    // if(this.props.selected_delete_bool){
    //   console.log("im gettign books");
    //   this.getBooks();
    // }



    

    //console.log("BOOKTI bookcase state", this.state);


    console.log("bookcas books state", this.state.bookIds);

    const hello = this.state.bookIds;

    if (this.state.shelves.length===0){
      return(
        <div className="bookcase-wrapper">
            <div>{this.props.title}</div>
          <div className="bookcase-container"> </div>
        </div>
      
        
      
      )
    }else{

      
    return (
      <div className="bookcase-wrapper">
        <div>{this.props.title}</div>
      <div className="bookcase-container">
        
        {this.state.shelves.map((shelf)=>{
          return( <Shelf 
            books={shelf} 
            handleBookClick={this.props.handleBookClick}
            selected_delete_id={this.props.selected_delete_id}
            selected_delete_bool={this.props.selected_delete_bool}
            ></Shelf>)
        })}
         
                  
      </div>
      </div>
      
    );



    }



  }}


export default Bookcase;

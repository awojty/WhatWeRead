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
    //console.log("BOOKTITLE" ,body);

    get("/api/getbooksforbookcase", body).then((book)=>{
      console.log("books for a given case", book);

      const ids = this.createIdsList(book);
      const Shelves = this.divideArrayIntoShelfs(book);
      //console.log("shelvsd", Shelves)
      this.setState({
        Books: book,
        bookIds: ids,
        shelves: Shelves,
      });
    })


  }

  createIdsList = (booksList) =>{
    //return lsit of ids of boooks that belong to the user

 
    let idsList = [];
    for(let i=0;i<booksList.length;i++){
      let id = booksList[i]._id;
      idsList.push(id);
    };

    return idsList;

  }


  returnShelf = (shelf) => {

  

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
      console.log("AAAbooks", book[0]);

      const ids = this.createIdsList(book);
      const Shelves = this.divideArrayIntoShelfs(book);
      
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

    if(this.props.progress_change){
      console.log("HANDLE  progress CHANGE TRIGGERED IN BOOKCASE");
      this.getBooks();
      //this.props.handleProgressChange();
      this.props.stopProgressChange();
    }



    

    //console.log("BOOKTI bookcase state", this.state);


   

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
            showBookPopUp={this.props.showBookPopUp}
            showHighlight={this.props.showHighlight}

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

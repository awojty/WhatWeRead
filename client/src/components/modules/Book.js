import React, { Component } from "react";
import bruh from "../Assets/book.png";
import book1 from "../Assets/book1.png";
import book2 from "../Assets/book2.png";
import book from "../Assets/book.png";
import './App.css';
import "../pages/Skeleton.css";
import "./Book.css";
import { get } from "../../utilities";

import BookHoverBox from "./BookHoverBor";


/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} content of the comment
 */
class Book extends Component {
  constructor(props) {
    super(props);
    this.state={
        color: "#aaa",
        title: "t",
        author: "autho",
        _id: null,
        // position_shelves:[],
        // image:"",
        isClicked:false,

    }
  }

  componentDidMount(){

    console.log("book mount props", this.props);

    console.log(this.props);
    this.setState({
      _id:this.props.book._id,
      title: this.props.book.title,
      user_id: this.props.book.user_id,
      total_pages: this.props.book.total_pages,
      completed_pages: this.props.book.completed_pages,
      remaining_pages: this.props.book.remaining_pages,
      color: this.props.book.color,
      author:this.props.book.author,
      image:this.props.book.image,
    });

    let body = {
      _id:this.props.book,
    };

    console.log("book book info", body);

    // get("/api/bookinfo",body).then((book)=>{

    //   console.log("i got a book", book);
    //   this.setState({
    //     author:book.author,
    //     title: book.title,
    //     user_id: book.user_id,
    //     total_pages: book.total_pages,
    //     completed_pages: book.completed_pages,
    //     remaining_pages: book.remaining_pages,
    //     color: book.color,

    //   })
    // })

  }

  showHoverbox =()=>{
    this.setState({
      isClicked:!this.state.isClicked
    })
    this.props.handleBookClick(
      this.state.title,
      this.state.color,
      this.state.author,
       this.state._id,
       this.state.total_pages,
       this.state.completed_pages,
       this.state.image
       );
  }

  highlight = () => {
    this.setState({
      isClicked: !this.state.isClicked,
    })
  }


  render() {
    console.log("BOOKTITLE book", this.state);

    console.log("bookprops", this.props);
      let image = this.props.bookDirectory;
      let photo = "";
      if (image=="book1"){
          photo=book1;
      }else{
          photo=book2;
      }
      console.log(this.state);
      console.log(this.props);
      if(this.props.selected_delete_bool===true && this.props.selected_delete_id===this.state._id){

        console.log("IM NOT SHOWING");
        return null;
      }else{
        return (
          <div>
           
            <div onClick={()=>{this.showHoverbox(), this.highlight()}} 
            className={`noselect book${(this.state.isClicked && this.props.showHighlight && this.props.selected_delete_id===this.state._id) ?  ' selected' : ''}`}  
            style={{"backgroundColor":this.state.color}}>{this.state.title}
            </div>
 
          </div>
            )


      }

      
      
      };
        
        
    
  
}

export default Book;

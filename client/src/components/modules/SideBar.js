import React, { Component } from "react";

import Shelf from "./Shelf.js";
import './App.css';
import "../pages/Skeleton.css";
import { get, post } from "../../utilities.js";
import "./SideBar.css";
import book1 from "../Assets/book1.png";

/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} content of the comment
 */


class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state={
      Books:[],
      bookIds:[],
      shelves:[],
      
  }}

  componentDidMount() {

    // let body ={
    //   user_id:this.props._id,
    //   title:this.props.title,
    // };
    // console.log("bookcase body" ,body);

    // get("/api/getbooksforbookcase", body).then((book)=>{
    //   console.log("books for a given case", book);

    //   const ids = this.createIdsList(book);
    //   const Shelves = this.divideArrayIntoShelfs(book);
    //   console.log("shelvsd", Shelves)
    //   this.setState({
    //     Books: book,
    //     bookIds: ids,
    //     shelves: Shelves,
    //   });
    // })


  }










  
  render() {

    

      return(
        <div className="sidebar-container">
            <img src={this.props.image} className="bookclub-image"></img>
            <h2>{this.props.title}</h2>
            {this.props.owner? <h4>You're an Owner</h4>: <h4>You're a Member</h4>}
          <div className="description"> Description: {this.props.description}</div>
          <h2>Members</h2>
          {this.props.members.map((name)=>{
            return(  <div>{name}</div>);
          })}
        

        </div>
      
        
      
      )
    


    



  }}


export default SideBar;

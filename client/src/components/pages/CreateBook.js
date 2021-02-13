import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Bookcase from "../modules/Bookcase.js";
import '../modules/App.css';
import "../../utilities.css";
import "./Skeleton.css";
import Painting from "../modules/Painting.js";
import BookSearch from "../modules/BookSearch";

import { SketchPicker } from 'react-color';
import { CirclePicker } from 'react-color';
import { navigate, Router, Redirect, Route } from "@reach/router";

import NavBar from "../modules/NavBar";

import SearchInternetPopUp from "../modules/SearchInternetPopUp";



import { get, post } from "../../utilities.js";
import exampleImg from "../Assets/home.png"


import "./CreateBook.css";
import ProfileNavBar from "../modules/ProfileNavBar.js";
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class CreateBook extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {

        title:"Title",
        author:"Author",
        background: "#afff",
        user_id: "blob",
        total_pages: 0,
        completed_pages: 0,
        remaining_pages: 0,
        bookcases:[],
        bookcase:"Read",
        searchInternet:false,
        image:exampleImg,
    };
  }

  handleChangeColor = (color) => {
    this.setState({ background: color.hex });
  };

  showBookRectangle = () => 
  {
      return(
      
      <div className="book-rectangle" style={{"backgroundColor":this.state.background, "fontWeight":"bold"}}>
        {this.state.title}
      </div>)


  }

  handleSearch = ()=>{
    this.setState({
      searchInternet:  !this.state.searchInternet
    });

  }

  onSubmit = () => {

    let body = {

    title: this.state.title,
    author: this.state.author,
    user_id: this.props.userId,
    total_pages: Number(this.state.total_pages),
    completed_pages: 0,
    remaining_pages: Number(this.state.total_pages),
    color:this.state.background,
    bookcase:this.state.bookcase, 
    image:this.state.image,
    

    };

    console.log(body);

    post("/api/createbook", body).then((response)=>{
          console.log("response");
          console.log(response);
          navigate("/home");

      })


  }
  handlePageCount = (event) => {

    this.setState({ total_pages: event.target.value, });


  }


  componentDidMount() {
    // remember -- api calls go here!
    let body = {
      user_id:this.props.userId
    }

    get("/api/getuserbookcases", body).then((bookcases)=>{
      console.log("bookcases,found", bookcases);
      this.setState({
        bookcases:bookcases
      })
    })
  }

  handleChangeBookTitle = (event) => {
    this.setState({ title: event.target.value, });
  };

  handleChangeBookAuthor = (event) => {
    this.setState({ author: event.target.value, });
  };

  handleSelect = (title,published, author, pages, image) => {

    console.log("HELLEOEOE");

    console.log("hadnleSelect title published", title, published, author,pages);
    this.setState({
      title:title,
      published:published,
      total_pages: pages,
      remaining_pages: pages,
      image:image,

      author: author,

    })



  }

  handleSelectBookcase = (event) => 
  {
    this.setState({
      bookcase:event.target.value
    });
  }

  togglePop = () => {
    console.log("asdas");
    
    this.setState({
      searchInternet: !this.state.searchInternet
    });
  };



  render() {
    console.log(this.state);
    return (
        <div className="App-Container">
          <ProfileNavBar name={this.props.name} respondFriend={this.respondFriend}/>

          <div className="bookadd-container">
           
        <div className="information-container">
        <button onClick={this.handleSearch}>Search the internet</button>
          <h2>
            Book title
            <input
            type="string"
            placeholder={this.state.title}
            onChange={this.handleChangeBookTitle}/>
            
          </h2>
      

        <div>
          <h2>
            Book Author:
            <input
            type="string"
            placeholder={this.state.author}
            onChange={this.handleChangeBookAuthor}/>
            
          </h2>
        </div>

        <div>
          <h2>
            Page count:
            <input
            type="number"
            value={this.state.total_pages}
            placeholder={"Page count"}
            onChange={this.handlePageCount}/>
            
          </h2>
        </div>
       

        <div>

              <button type="submit">Select bookcase</button>
              <select defaultValue = "Sort" onChange={this.handleSelectBookcase}>
                {this.state.bookcases.map((bookcase)=>{
                  return( <option value={bookcase.titel}>{bookcase.title}</option>);
                })}

              </select>
          </div>

          </div>

          <div className="color-information">
            <div className="images-section">
            <img className="book-cover" src={this.state.image}></img>

          {this.showBookRectangle()}
          </div>
        
<h2>Pick the book color</h2>
        <CirclePicker 
            color={ this.state.background }
            onChangeComplete={ this.handleChangeColor}/>

</div>
        
        </div>
        {this.state.searchInternet ? <SearchInternetPopUp  toggle={this.handleSearch} handleSelect={this.handleSelect}/> : null }

     
        


        <button type="submit" onClick={this.onSubmit}>Submit</button>

              </div>
              
    );
  }
}

export default CreateBook;

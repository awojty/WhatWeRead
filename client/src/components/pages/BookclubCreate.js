import React, { Component } from "react";


import { get, post } from "../../utilities.js";
import { navigate, Router, Redirect, Route } from "@reach/router";
import NavBar from "../modules/NavBar.js";
import book1 from "../Assets/book2.png";
import axios from 'axios';

import ImageUploader from 'react-images-upload';

import FileBase from 'react-file-base64';
// import { storage } from './firebase-config';
import DefaultImg from "./ginger-cat-gardener-cat.png";

import plawcer from "./ginger-cat-gardener-cat.png";

import placer from "../Assets/landing_page_photo.png";
import SearchInternetPopUp from "../modules/SearchInternetPopUp";
import "./BookclubCreate.css";
import Button from '@material-ui/core/Button';
import ProfileNavBar from "../modules/ProfileNavBar.js";



/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} content of the comment
 */


class BookclubCreate extends Component {
  constructor(props) {
    super(props);
    this.state={
        title:null,
        author:null,
        image:null,
        description:"",
        theme:"topic",
        book_title:"bookTitle",
        searchInternet:false,
        image : DefaultImg,
        uploading: false,
        multerImage: DefaultImg,
        firebaseImage: DefaultImg,
        baseImage: DefaultImg,
        images:[],
        allow_adding_friends:false,
        pictures:[],
        imageName: "base-image-" + Date.now(),
        imageData: "none"
    } 

  
  }

  handleSelect = (title,published, author, pages,image) => {

    console.log("HELLEOEOE");

    console.log("hadnleSelect title published", title, published, author,pages, image);
    this.setState({
      book_title:title,
      image:image,


      author: author,

    });

    console.log(this.state);



  }

  handleSearch = ()=>{
    this.setState({
      searchInternet:  !this.state.searchInternet
    });

  }

  componentDidMount(){

    console.log("props",this.props);
      this.setState(
          {
            title:this.props.title,
            author:this.props.author,
           
            book_id:this.props.book_id
          }


      )
  }

  handleDescription = (event) => 
  {
    this.setState({
      description:event.target.value
    });
  }

  handleTitle = (event) => 
  {
    this.setState({
      title:event.target.value
    });
  }

  handleAuthor = (event) => 
  {
    this.setState({
      author:event.target.value
    });
  }

  onSubmit = () => {

    let body = {

    title: this.state.title,
    author: this.state.author,
    user_id: this.props.userId,
    book_id:  this.state.book_id,
    book_title:  this.state.book_title,
    imageName: this.state.imageData,
    imageData: this.state.imageData,
    description:this.state.description,
    image:this.state.image,
    };

    console.log(body);

    post("/api/makebookclub", body).then((response)=>{
          console.log("response");
          console.log(response);
          navigate("/home");

      })


  }

  handleBookTitle = (e) => {
    this.setState({
      book_title:e.target.value
    });
  }

  returnThemeForm = () => {
    if(this.state.theme==="topic"){
      return(
      <>
        <div>
            <h4 className="section-name">
              Bookclub Title
              <input
              className="label-title"
              type="string"
              placeholder={this.state.title}
              onChange={this.handleTitle}/>
              
            </h4>
            </div>


            <div>
            <h4 className="section-name">
              Bookclub Description
              <textarea 
              name="Text1" cols="30" rows="5"
              className="label-description"
              type="textarea"
              placeholder={"This bookclub is about..."}
              onChange={this.handleDescription}
              >
              </textarea>
            
              
            </h4>
            </div>


      
      </>)
    }else{
      return(
        <div>
          <div className="intro">
            <Button variant="contained" color="primary" onClick={this.handleSearch}>Search the internet for a book</Button>
            </div>
            <div>
            <h4 className="section-name">
            Bookclub Title
            <input
             className="label-title"
            type="string"
            placeholder={this.state.title}
            onChange={this.handleTitle}/>

            </h4>
            </div>

            
            <div className="label-category">

            <h4 className="section-name">
            Book Title
            <input
             className="label-title"
            type="string"
            placeholder={this.state.book_title}
            onChange={this.handleBookTitle}/>

            </h4>
            </div>

            <div>
            <h4 className="section-name">
            Book Author
            <input
             className="label-title"
            type="string"
            placeholder={this.state.author}
            onChange={this.handleAuthor}/>
            </h4>
            </div>


            <div>
            <h4 className="section-name">
              Bookclub Description
              <textarea 
              name="Text1" cols="30" rows="5"
              className="label-description"
              type="textarea"
              placeholder={"This bookclub is about..."}
              onChange={this.handleDescription}
              >
              </textarea>
            
              
            </h4>
            </div>
        </div>
        



      );
    }
  }

  handleChangeTheme =(e) =>{
    this.setState({
      theme:e.target.value

    })

  }

  onDrop = (pictureFiles, pictureDataURLs) => {
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles)
    });
  }

  setDefaultImage(uploadType) {
    if (uploadType === "multer") {
      this.setState({
        multerImage: book1
      });
    } else if (uploadType === "firebase") {
      this.setState({
        firebaseImage: book1
      });
    } else {
      this.setState({
        baseImage: book1
      });
    }
  }


    // function to capture base64 format of an image
  getBaseFile(files) {
      // create a local readable base64 instance of an image
      this.setState({
       image: files.base64,
       imageName: "base-image-" + Date.now(),
       imageData: files.base64.toString()
      });
  
      let imageObj = {
        imageName: "base-image-" + Date.now(),
        imageData: files.base64.toString()
      };
  
      axios.post("/api/uploadbase", imageObj)
        .then((data) => {
          if (data.data.success) {
            alert("Image has been successfully uploaded using base64 format");
            this.setDefaultImage("base");
          }
        })
        .catch((err) => {
          alert("Error while uploading image using base64 format")
          this.setDefaultImage("base");
        });
    }

    handleAddFriends =() =>{
      this.setState({
        allow_adding_friends: !this.state.allow_adding_friends
      });
    }

  







  render() {

    console.log("STATE", this.state);

    return (
      <div>
        <ProfileNavBar/>
        <p className="section-name intro">Fill in the fields to create a bookclub. If you want to create one for a specific book, select "Book bookclub". If you want to create bookclub for a specific topic, select "Topic bookclub".
          When you create a bookclub for a book, you have an option to fill in the fields automatically by selecting a book from the internet. To allow other members to add their friends to the bookclub, tick the Allow the last checkbox. Otherwise, only the creator of the bookclub can do that.
        </p>
        <div className="bookclub-container">
            <div className="bookclub-info">
                  <h4>How do you want to create a bookclub?</h4>

                  <div className="toggle-radio u-box-shadow u-margin-left-20">       
                                  <input
                                    type="radio"
                                    name="default"
                                    id="time"
                                    value="topic"
                                    onClick={this.handleChangeTheme} />
                                  <label className="left u-bold" htmlFor="time"
                                  
                                  >Topic bookclub</label>

                                  <input
                                    type="radio"
                                    name="default"
                                    id="quantity"
                                    value="book"
                                    onClick={this.handleChangeTheme}
                                  />
                                  <label className="right u-bold" htmlFor="quantity">Book bookclub</label>
                  </div>
                  {this.returnThemeForm()}
                  <label className="section-name">
                  <input
                  type="checkbox"
                  onChange={this.handleAddFriends}
                  ></input>
                      Allow adding friends by members
                  </label>
                  <div className="button-wrapper">
                  <Button fullWidth={false} variant="outlined" color="primary" type="submit" onClick={this.onSubmit}>Create Bookclub</Button>
                  </div>
            </div>
            <div className="bookclub-info container-avatar">
                <h2>You bookclub avatar</h2>
                <img src={this.state.image} className="bookclub-avatar"></img>

                <div className="process__upload-btn">
                  <h4>Upload your avatar</h4>
              <FileBase type="file" multiple={false} onDone={this.getBaseFile.bind(this)} />
            </div>
            </div>
     
        {this.state.searchInternet ? <SearchInternetPopUp  toggle={this.handleSearch} handleSelect={this.handleSelect}/> : null }
        </div>

        
      </div>
    );
  }}


export default BookclubCreate;

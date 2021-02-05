import React, { Component } from "react";


import { get, post } from "../../utilities.js";
import { navigate, Router, Redirect, Route } from "@reach/router";
import NavBar from "../modules/NavBar.js";
import book1 from "../Assets/book2.png";
import axios from 'axios';

import ImageUploader from 'react-images-upload';

import FileBase from 'react-file-base64';
// import { storage } from './firebase-config';
import DefaultImg from '../Assets/book1.png';
import SearchInternetPopUp from "../modules/SearchInternetPopUp";
import "./BookclubCreate.css";


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
        image : book1,
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
      this.setState(
          {
            title:this.props.title,
            author:this.props.author,
            image:this.props.image,
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
            <p>
              Bookclub Title
              <input
              type="string"
              placeholder={this.state.title}
              onChange={this.handleTitle}/>
              
            </p>
            </div>


            <div>
            <p>
              Bookclub Description
              <input
              type="string"
              placeholder={"This bookclub is about..."}
              onChange={this.handleDescription}/>
              
            </p>
            </div>


      
      </>)
    }else{
      return(
        <div>

     

            <button onClick={this.handleSearch}>Search the internet for a book</button>


            <div>


            <p>

            Bookclub Title
            <input
            type="string"
            placeholder={this.state.title}
            onChange={this.handleTitle}/>

            </p>
            </div>

            
            <div>

            <p>

            Book Title
            <input
            type="string"
            placeholder={this.state.book_title}
            onChange={this.handleBookTitle}/>

            </p>
            </div>

            <div>
            <p>
            Book Author
            <input
            type="string"
            placeholder={this.state.author}
            onChange={this.handleAuthor}/>

            </p>
            </div>


            <div>
            <p>
            Bookclub Description
            <input
            type="string"
            placeholder={"This bookclub is about..."}
            onChange={this.handleDescription}/>

            </p>
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

    console.log(this.state);

    return (
      <div>
        <NavBar/>
        <p>Fill in the fields to create a bookclub. If you want to create one for a specific book, select "Book bookclub". If you want to create bookclub for a specific topic, select "Topic bookclub"
          When you create a bookclub for a book, you have an option to fill in teh fields automatically by slecting a book from an internet
        </p>
        <div className="bookclub-container">
            <div className="bookclub-info">
                  <p>How do you want to create a bookclub?</p>

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
                  <button type="submit" onClick={this.onSubmit}>Create Bookclub</button>
            </div>
            <div className="bookclub-info">
                <p>You bookclub avatar</p>
                <img src={this.state.image} className="bookclub-avatar"></img>
                <button onClick={this.uploadAvatar}>Change The avatar</button>
                <div className="process__upload-btn">
              <FileBase type="file" multiple={false} onDone={this.getBaseFile.bind(this)} />
            </div>
            </div>
     
        {this.state.searchInternet ? <SearchInternetPopUp  toggle={this.handleSearch} handleSelect={this.handleSelect}/> : null }
        <div>add firneds</div>
        
        <input
        type="checkbox"
        onChange={this.handleAddFriends}
        ></input>

        
        {this.state.pictures.length>0 ?  <img className="image" src={this.state.pictures[0]}/> : null }
        </div>

        
      </div>
    );
  }}


export default BookclubCreate;

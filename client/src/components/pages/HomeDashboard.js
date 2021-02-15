import React, { Component } from "react";



import "../pages/Skeleton.css";
import './HomeDashboard.css';
import bookcase from "../Assets/Bookcase.png";
import Bookcase from "../modules/Bookcase.js";
import { get, post } from "../../utilities.js";
import { navigate } from "@reach/router";
import NavBar from "../modules/NavBar";
import "./BookclubsDashboard.css";
import AddBookcasePopUp from "../modules/AddBookcasePopUp";
import ProfileNavBar from "../modules/ProfileNavBar";

import BookHoverBox from "../modules/BookHoverBor";

import defImg from "../Assets/hello.png";
import UpdateProgressPopUp from "../modules/UpdateProgressPopUp";
import MoveBookcasePopUp from "../modules/MoveBookcasePopUp";

import Confetti from 'react-confetti';

import FinishBookPopUp from "../modules/FinishBookPopUp";

/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} content of the comment
 */


class HomeDashboard extends Component {
  constructor(props) {
    super(props);
    this.state={
      bookcases:[], 
      addBookcase:false,
      title:"title",
      selected_title:"",
      selected_color: "",
      selected_author: "",
      selected_id: "",
      showBookPopUp: false,
      total_pages: 100,
      completed_pages: 0,
      image:defImg,
      showUpdateProgressPopUp:false,
      showMoveBookcasePopUp:false,
      stars:0,
      review:"",
      selected_delete:false,
      startConfetti:false,
      progress_change:false,
  }

}

changeBoolProgress = () => {
  this.setState({
    progress_change:!this.state.progress_change,
  })
}

onChangeTitle = (event) => {
  this.setState({ title: event.target.value, });
};

  componentDidMount() {

    console.log(this.props);
    let body = {
      user_id: this.props.userId,
  
    };



    get("/api/getuserbookcases",body).then((bookcases)=>{

      console.log("bookcases found", bookcases)
      this.setState({
        bookcases:bookcases,
      });

    })



  }

  onSubmit = () => {

    let body = {
  
    title: this.state.title,
    user_id:this.props.userId,
  
    };
  
    console.log("bookcase body", body);
  
    post("/api/createbookcase", body).then((response)=>{
          console.log("response");
          console.log(response);
          let newArray = this.state.bookcases.concat([response]);
         this.setState({
           bookcases:newArray
         });
  
      })
  
  
  }

  goToAddBook = () =>{
    navigate("/addbook");
  }

  goToAddShelf = () =>{
    navigate("/addbookcase");
  }

  goToAddFriends = () =>{
    navigate("/community");
  }

  goToBookclubs=()=>{
    let url = "/bookclubs";
    navigate(url);

}

togglePop = () => {
  this.setState({
    addBookcase: !this.state.addBookcase
  });
};

changeAddBookcase = () => {
  this.setState({
    addBookcase:!this.state.addBookcase
  });
}

handleCloseClick = () => {

  this.setState({

    showBookPopUp:!this.state.showBookPopUp,
    showHighlight:false,


  });

}


handleBookClick = (title,color,author,id, total_pages, completed_pages, image) => {
  console.log("GGGGGGGGGGGGggg")

  let bdy = {
    book_id:id
  }

  console.log("returned onBookClick body", bdy);

  console.log("returned onBookClick", author,id, total_pages, completed_pages, image)

  get("/api/getbook", bdy).then((res)=>{
    console.log("returned onBookClickres1", author,id, total_pages, completed_pages, image);
    console.log("returned onBookClickres2", res);
    this.setState({
      selected_title: res.title,
      selected_color: res.color,
      selected_author: res.author,
      selected_id: res._id,
      showBookPopUp:!this.state.showBookPopUp,
      total_pages: res.total_pages,
      completed_pages:res.completed_pages,
      image:res.image,
      showHighlight:true,
  
    });
  



  })



  

  let body = {
    book_id:id
  }

  get("/api/getareview", body).then((res)=>{
    this.setState({
      stars:res.stars,
      review:res.content
    });
  })
}

toggleProgress = () => {
  this.setState ( {
    showUpdateProgressPopUp: !this.state.showUpdateProgressPopUp,
    showBookPopUp:false,
    showMoveBookcasePopUp:false,
    showHighlight: true,

  })
}

closeProgressPopUp = () => {

  this.setState ({
    showUpdateProgressPopUp: false,
    showBookPopUp:false,
    showMoveBookcasePopUp:false,
    showHighlight: false,

  });
}

closeMoveBookcasePopUp = () => {

  this.setState ( {
    showUpdateProgressPopUp: false,
    showBookPopUp:false,
    showMoveBookcasePopUp:false,
    showHighlight: false,

  })

}


toggleMoveBookcase = () => {
  this.setState ( {
    showMoveBookcasePopUp: !this.state.showMoveBookcasePopUp,
    showUpdateProgressPopUp:false,
    showMoveBookPopUp:false,
    showHighlight:true,

  })
}

handleDeleteOnHome = () =>{

  console.log("BOOKTITLE home", this.state)
  this.setState({

    selected_delete:true,

  });
  navigate("/home");
}

showConfetti = () => {
  return (
    <>
        <Confetti></Confetti>
            <FinishBookPopUp
            
      onFinishBook={this.onFinishBook}
      handleCloseClick={this.handleCloseClick}
      selected_delete_bool={this.state.selected_delete}
      handleDelete= {this.handleDeleteOnHome}
      stars={this.state.stars}
      toggleProgress={this.toggleProgress}
      handleBookClick={this.handleBookClick}
      toggleMoveBookcase={this.toggleMoveBookcase}
      book_id={this.state.selected_id}
      selected_id={this.state.selected_id}

        title={this.state.selected_title} 
        _id={this.props._id}
        author = {this.state.selected_author}
        completed_pages={this.state.completed_pages}
        total_pages={this.state.total_pages}
        image={this.state.image}
            
            />

    </>
  );
}

onFinishBook = () => {
  this.setState({
    startConfetti:true,
    showBookPopUp:false,
    showHighlight:false,
  });

  this.submitFinalProgress();
}

submitFinalProgress = () => {
  let body = {
    book_id : this.state.selected_id,
    
    completed_pages: this.state.total_pages, 
    remaining_pages: 0,
  };

  console.log("body to send progress  quant goal is ");
      console.log(body);




  post("/api/updateprogress", body).then((response) =>{

    console.log("returned after progress update is", response);



    

    
  });

};


handleProgressChange = (complete,remaining) => {

  console.log("handleprogresschange, complerte, remain", complete, remaining);
  this.setState({
    completed_pages:complete,
    remaining_pages:remaining,
    progress_change:true
  })
}

stopProgressChange = () => {

  this.setState({
   
    progress_change:false
  })
}







  
  render() {

    console.log("handleprogresschange, complerte, STATE", this.state);




    return (

      <div className="app">
        {this.state.startConfetti ? this.showConfetti() : null}
      
      <div className="spacer"></div>
      {this.state.showBookPopUp ? 
      <BookHoverBox 
      onFinishBook={this.onFinishBook}
      handleCloseClick={this.handleCloseClick}
      selected_delete_bool={this.state.selected_delete}
      handleDelete= {this.handleDeleteOnHome}
      stars={this.state.stars}
      toggleProgress={this.toggleProgress}
      handleBookClick={this.handleBookClick}
      toggleMoveBookcase={this.toggleMoveBookcase}
      book_id={this.state.selected_id}
      selected_id={this.state.selected_id}

        title={this.state.selected_title} 
        _id={this.props._id}
        author = {this.state.selected_author}
        completed_pages={this.state.completed_pages}
        total_pages={this.state.total_pages}
        image={this.state.image}
        />:null}

{this.state.showUpdateProgressPopUp ? 
      <UpdateProgressPopUp
      closeProgressPopUp = {this.closeProgressPopUp}
      handleProgressChange = {this.handleProgressChange}
      handleCloseClick={this.handleCloseClick}
      toggleProgress={this.toggleProgress}
      handleBookClick={this.handleBookClick}
        title={this.state.selected_title} 
        _id={this.props._id}
        book_id={this.state.selected_id}
        author = {this.state.selected_author}
        completed_pages={this.state.completed_pages}
        total_pages={this.state.total_pages}
        image={this.state.image}
        />:null}

{this.state.showMoveBookcasePopUp ? 
      <MoveBookcasePopUp
      closeProgressPopUp = {this.closeProgressPopUp}

      handleCloseClick={this.handleCloseClick}
      toggleProgress={this.toggleMoveBookcase}
      toggleMoveBookcase={this.toggleMoveBookcase}
      handleBookClick={this.handleBookClick}
        title={this.state.selected_title} 
        _id={this.props._id}
        book_id={this.state.selected_id}
        author = {this.state.selected_author}
        completed_pages={this.state.completed_pages}
        total_pages={this.state.total_pages}
        image={this.state.image}
        />:null}

      <div className="fixed-container">
      <ProfileNavBar name={this.props.name}/>
    

      </div>
    

        <div className="bookclubs-container">
      

       
            {this.state.bookcases.slice(0,2).map((bookcase,i)=>{
         return(<Bookcase
         stopProgressChange = {this.stopProgressChange}
           key = {i} 
           handleProgressChange={this.handleProgressChange}
           showBookPopUp={this.state.showBookPopUp}

           showHighlight={this.state.showHighlight}
           
           _id={bookcase.user_id}
            title={bookcase.title}
             handleBookClick={this.handleBookClick}
             selected_delete_bool={this.state.selected_delete}
             selected_delete_id={this.state.selected_id}
             progress_change={this.state.progress_change}
             />);

            })}

     <div className="paintings-container">
            <button className="painting-wrapper" onClick={this.goToAddBook}>Add new book</button>
             <button className="painting-wrapper" onClick={this.changeAddBookcase}>Add new bookcase</button>
            <button className="painting-wrapper" onClick={this.goToAddFriends}>Add friends</button>
     </div>
     {this.state.addBookcase ? <AddBookcasePopUp title={this.state.title} onChangeTitle={this.onChangeTitle}toggle={this.togglePop} userId={this.props.userId} onSubmit={this.onSubmit}/> : null}
     <div className = "createnew-wrapper">
        <p>Go to bookclubs</p>
      <div className="entry-container" onClick={this.goToBookclubs}>

      </div>

      </div>

      {this.state.bookcases.slice(2).map((bookcase,i)=>{
         return(<Bookcase key ={i}
          showHighlight={this.state.showHighlight}
          stopProgressChange = {this.stopProgressChange}
          handleProgressChange={this.handleProgressChange}
           _id={bookcase.user_id} 
          title={bookcase.title}
           handleBookClick={this.handleBookClick} 
          selected_delete_id={this.state.selected_id}
          selected_delete_bool={this.state.selected_delete}
          />);

            })}


        
        </div>
        <div className="floor"></div>




          </div>
    );
  }}


export default HomeDashboard;

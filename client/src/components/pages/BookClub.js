import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import '../modules/App.css';
import "../../utilities.css";
import "./Skeleton.css";
import BookclubNote from "../modules/BookclubNote.js";

import { navigate, Router, Redirect, Route } from "@reach/router";
import { get, post } from "../../utilities.js";

import defaultImage from "../Assets/book1.png";
import "./CreateBook.css";
import SideBar from "../modules/SideBar.js";

import "./BookClub.css";
import InviteBookclubPopUp from "../modules/InviteBookclubPopUp";
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "480244722799-u3pjrlh16hioq4pe3bsb873pc5nrc8pe.apps.googleusercontent.com";

class BookClub extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {

        title:"Title",
        invitations: [],
        friendList: [],
        showLoading: true,
        bookclub_owner_id: "", 
        bookclub_title: "",
        book_id: "",
        startNew:false,
        topic:"",
        topics: [],
        seen:false,
        owner:false,
        image:defaultImage,
        description:"none",
        members:[],
        memberNames:[],
       

    };
  }





  friendsContent = (friends) => {

    if (friends.length === 0) {

      return (
        <div className="u-large-text u-center">
          <p>It looks like you don't have any friends yet!</p>
          <p>Click  to add new friends.</p>
        </div>
      );

    } else {
      return friends.map((friend, index) => this.friendItem(friend, index))
    }


  }

  friendItem = (friend, index) => {
    let name;
    let _id;
    if (friend.friend_name === this.props.name) {
      name = friend.friend_requester_name;
      _id = friend.user_id;
    } else {
      name = friend.friend_name;
      _id = friend.friend_id
    };

  


    const url = "/profile" ;



    return (<div className="invitation-item">
      <div >{name}</div>


    

    </div>);



  };

  verifyOwnership = (user_id, owner_id) => {
    // returns true if the user is the owner of the club 
    if(user_id===owner_id){
      return true;
    }else{
      return false;
    }

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
          navigate("/home");

      })


  }


  getNotes = async () => {

    const body = { 
        user: this.props.userId,
        bookclub_id:this.props.bookclub_id,
     };
    const goalObjs = await get("/api/getnotes", body);
    return goalObjs;


  }

  getBookclub = async (bookclub) => {
    const body = { 
        user_id: this.props.userId,
        _id:bookclub,
     };
     console.log("body get bookclub", body);
    const goalObjs = await get("/api/getbookclub", body);
    return goalObjs;
  };

  viewFriends = async () => {
    console.log("view friends");

    let friends = await get("/api/viewfriends");
    return friends;
  }

   componentDidMount() {
    this.getBookclub(this.props.bookclub_id).then((bookObj) => {

        console.log("INV" + bookObj);

        let owner = this.verifyOwnership(this.props.userId, bookObj.bookclub_owner_id);
        this.setState({
            bookclub_owner_id: bookObj.bookclub_owner_id, 
            bookclub_title: bookObj.bookclub_title,
            book_id: bookObj.bookclub_id,
            owner:owner,
            image:bookObj.image,
            description:bookObj.description,
            book_title:bookObj.book_title,


        });

        this.getNotes().then((notes)=>{

            this.setState({
                topics:notes,
            });

        });

        this.getMembers().then((members)=>{

          console.log("members", members);

          let memberNames=this.extractMemberNames(members);

          console.log("NAMES", memberNames)

          this.setState({
            members:members,
            memberNames:memberNames,
        });


        })
      }
      
      
      );
  
        }

        extractMemberNames = (array) => {

          console.log(array);

          let answer=[];
          if(array.length>0){
            answer =[array[0].bookclub_owner_name];

            console.log(answer);


          }
   


          for(let i=0; i<array.length;i++){
            answer.push(array[i].member_name);
            console.log(answer);

          }

          return answer;
        }
  
  


  goToLibrary =() =>{
      navigate("/home");
  }

  goToBookclubs =() =>{
    navigate("/bookclubs");
}
goToAddBookclubs =() =>{
    navigate("/addbookclub");
}

startNewThread = () => {
    this.setState({
        startNew: !this.state.startNew,
    });
}

handleChangeTopic = (event) => {
    this.setState({
        topic:event.target.value
    })
}

submitTopic = () => {
    let body = {

        bookclub_title: "title", //to do - should be taken form teh inpout
        bookclub_id: this.props.bookclub_id,
        content: "conten" // todo - should be taken form the input   
};

    post("/api/addnote", body).then((topic)=>{
        console.log("topuc", topic);
        const newArray = this.state.topics.concat([topic]);
        this.setState({
            topics:newArray,
        })
    });

}

getMembers = async () => {

  let body = {
    bookclub_id: this.props.bookclub_id,

  }

  console.log(this.props);
  let friends = await get("/api/getbookclubmembers", body);
  return friends;

}

startPopUp = () => {
    console.log("statr popou");

    this.setState({
        seen: !this.state.seen,
    })
}


togglePop = () => {
    this.setState({
      seen: !this.state.seen
    });
  };

  render() {
    console.log(this.state);
    return (
        <div className="bookclub-app">
        
            {/* <div className="friend-wrapper">
            <p >{this.state.bookclub_title}</p>
            <p >{this.state.bookclub_owner_id}</p>
            <div className="invitation-container u-bold">
            <p className="u-bold">{this.state.book_id}</p>
            </div>
            </div> */}
            <SideBar image={this.state.image} title={this.state.bookclub_title} description={this.state.description} members={this.state.memberNames}/>
            <div className="stuff-container"> 
            {this.state.startNew && (
              <div>
                  <p>Put the titel of the discussion</p>
                <input
                  value={this.state.topic}
                  type="text"
                  onChange={this.handleChangeTopic}
                />
                <button onClick={this.submitTopic}>Add topic</button>
              </div>)

            }

            <div className="notes-container">

            {this.state.topics.map((topic, key)=>{
                return(<BookclubNote note_id={topic._id}/>)
            })}

            </div>


            
        <div className="fixedElement">
        <button className="button-bookclub" onClick={this.startNewThread}>Start new thread</button>

        <button onClick={this.goToBookclubs}>Go To Bookclubs</button>
            <button onClick={this.goToAddBookclubs}>Create Bookclubs</button>
            {this.state.owner ?   <button onClick={this.startPopUp}>Invite friend to the bookclub</button> : null}

          
        </div>
        {this.state.seen ? <InviteBookclubPopUp toggle={this.togglePop} userId={this.props.userId} bookclub_id={this.props.bookclub_id}/> : null}
        </div>
      




              </div>
              
    );
  }
}

export default BookClub;

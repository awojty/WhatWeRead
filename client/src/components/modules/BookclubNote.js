import React, { Component } from "react";

import { get, post } from "../../utilities.js";
import BookclubComment from "../modules/BookclubComment";

import "./BookclubNote.css";

class BookclubNote extends Component {
  constructor(props) {
    super(props); 
    this.state= { 
        comments:[],
        note_id: "ada",
        newComment:"Your opinion...",
        
    }
  }

  componentDidMount(){

    

      let body={
          note_id: this.props.note_id,
      };

      const Note = this.props.note_id;

      console.log("props", this.props);

      console.log("note", Note);

      console.log("body in the note", body);

      get("/api/getcomments", body).then((comments)=>{
          console.log("comments received ", comments);
          this.setState({
              comments:comments,
              note_id: Note
          });
          
          return;
      })
     
  }

  recordNewComment = (e) =>{
      this.setState({
          newComment:e.target.value
      });
      return;

  }

  postComment =() => {

    console.log("in the psot comment porps", this.props.node_id);
    console.log("in the psot comment state", this.state);

    let body2 = {
        note_id: this.state.note_id,
        name:"asas",
        content: this.state.newComment,  //text of the comm

    };

    console.log(body2);

    post("/api/addbookclubcomment", body2).then((comment)=>{
        const newComment = this.state.comments.concat([comment]);
        this.setState({
            comments:newComment
        });
    })

  }


  render() {
      console.log("state in render", this.state);

    return (
      <div className="note">
          {this.props._id}
          <h3 className="note-title">Content of the note</h3>
          <form>
          <input
          type="text"
          placeholder="What is your opinion?"
          value={this.state.newComment}
          onChange={this.recordNewComment}
          
          ></input>
          <button onClick={this.postComment}>Post</button>
          </form>
          
          {this.state.comments.map((comment)=>{
              return(<BookclubComment 
                content={comment.content}
                name={comment.user_name}
                // date={comment.date}
                />)
          })}

         
      </div>
    );
  }}


export default BookclubNote;

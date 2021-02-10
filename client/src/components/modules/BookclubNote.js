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
        newComment:"",
        
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

  postComment =(event) => {
    event.preventDefault();

    

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
        return;
    })

  }

  getParsedDate(strDate){
    var strSplitDate = String(strDate).split(' ');
    var date = new Date(strSplitDate[0]);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date =  dd + "-" + mm + "-" + yyyy;
    return date.toString();
}



  render() {
      console.log("state in render", this.state);

      console.log(this.props)

    return (
      <div className="note">
          {/* <div className="note-top-wrapper"> */}
         <div className="note-title author-note-style">
         <h5>{this.props.creator}</h5>
          <div className="font-size">{this.getParsedDate(this.props.date)}</div>
             </div> 

             {/* </div> */}
          <h4 className="title-note-style">{this.props.content}</h4>

          <form>
          <input
          type="text"
          placeholder="Your opinion..."
          value={this.state.newComment}
          onChange={this.recordNewComment}
          
          ></input>
          <button onClick={this.postComment}>Post</button>
          </form>
          
          {this.state.comments.map((comment)=>{
              return(<BookclubComment 
                content={comment.content}
                name={comment.user_name}
                date={comment.date}
                />)
          })}

         
      </div>
    );
  }}


export default BookclubNote;

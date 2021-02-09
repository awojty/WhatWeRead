import React, { Component } from "react";
import Checkbox from 'react-checkbox';
import { get, post } from "../../utilities.js";
import "./InviteBookclubPopUp.css";
import { navigate, Router, Redirect, Route } from "@reach/router";
import friend from "../../../../server/models/friend.js";


class InviteBookclubPopUp extends Component {

    constructor(props) {
        super(props);
        this.state={
        
            friends:[],
            friendsDict:{},
            canInvite:[]
      }
    
    }

    handleClick = () => {
        this.props.toggle();
      };

createCheckboxes =(friends) => {

    let dict={};
    for(let i=0; i<friends.length;i++){

        dict[friends[i]._id]={
            data:friends[i],
            marked:false,

        };}
    return dict;
}

getFriends = async () => {
  let friends = await get("/api/viewfriends");
  return friends;

}

getMembers = async () => {
  let friends = await get("/api/getbookclubmembers");
  return friends;

}

getInvited = async () => {
  let friends = await get("/api/getpeopleinvitedtobookclub");
  return friends;

}

//both invited and already members are are bookclub memebrs format : they have member_id key 
//since we only allow the creaotr to invite freinds then we are always using the member_id
//freind has both freind requester and friends id
//fro all items in member+invited check if member id in this item si equal to either frind requester 
canInvite = (members, invites, friends) => {
  let membersSchema = invites.concat(members);
  let canInvite = [];

  console.log("things showing up", membersSchema);
  console.log("friends",friends);
  console.log("invited", invites);
  console.log("members", members);

  for(let i=0;i<friends.length;i++){

    let cancelled = false;

    for(let j=0;j<membersSchema.length;j++){

      console.log("entered member loopo");
      if(membersSchema[j].member_id === friends[i].friend_id || membersSchema[j].member_id === friends[i].friend_requester_id){
        //given frined is already a member  or a mameber object in the DB
        cancelled=true;
        break;
      }
      // if(j===membersSchema.length-1){
      //   canInvite.push(friends[i]);
      // }

    };

    if(!cancelled){
      canInvite.push(friends[i]);

    }
  };

  console.log("can invite", canInvite);

  return canInvite;

}



componentDidMount(){
  console.log("ads");
  this.getFriends().then((friends)=>{
    this.getMembers().then((members)=>{
      this.getInvited().then((invited)=>{
        console.log("memebr", members);
        console.log("invited", invited);
        console.log("frined", friends);
        let combination = members.concat(invited);
        //console.log("comb", combination);
        let allowedToInvite = combination.filter(x => !friends.includes(x));
        //console.log("alllowed", allowedToInvite);

        let canInvite = this.canInvite(members,invited, friends);
        console.log("caninvite", canInvite);
        
        const dictionary = this.createCheckboxes(canInvite);
        this.setState({
            friends:friends,
            friendsDict:dictionary,
            canInvite: canInvite,
        });
        
      })
    })
  })



}

absDifference = (arr1, arr2) => {
  const res = [];
  for(let i = 0; i < arr1.length; i++){
     const el = Math.abs((arr1[i] || 0) - (arr2[i] || 0));
     res[i] = el;
  };
  return res;
};

handleChange = (friend_id)=>{
    
    let newDict = this.state.friendsDict;
    newDict[friend_id].marked = !newDict[friend_id].marked;
    this.setState({
        friendsDict:newDict,
    });
    return;

}

sendInvitations = async () => {
    let requests=[];
    let friend_name;
    let friend_id;

    for(let i=0; i<this.state.friends.length;i++){
        if(this.state.friends.user_id===this.props.user_id){
            friend_name = this.state.friends[i].friend_name;
            friend_id = this.state.friends[i].friend_id;
        }else{
            friend_name = this.state.friends[i].friend_requester_name;
            friend_id = this.state.friends[i].user_id;
        }

        let body={
            member_name:friend_name,
            member_id:friend_id,
            bookclub_id: this.props.bookclub_id,

        };

        let id = this.state.friends[i]._id;

        console.log("id", id);


        console.log(this.state.friendsDict);
        console.log(this.state.friendsDict[id]);


        if (this.state.friendsDict[id].marked===false){
          //if you didnt marke the merson, dont send an invitation 
          continue;
        }else{
          requests.push(
            post("/api/invitetobookclub", body).then(
                async (response)=>{

                console.log("resopne", response);
                
                    // if everything is fine resiolve to true or for example your body content
                    return Promise.resolve(true);}

            )
        );

        }



    }
    console.log("Left For Loop");

    // wait until all requests are done!
    await Promise.all(requests).then((results)=>{
        // here we have all the results
        console.log('all requests finished!', results);
        for(let i = 0; i < requests.length; i++){
          console.log(i, 'request resultet in', results[i]);
        }
        console.log("BLBOB");

        this.props.toggle();
    });
   

}

determineDisplayName = (friend_requester_id, friend_requester_name, friend_name) => {

  if(this.props.userId ===friend_requester_id){
    return friend_name;
  }else{
    return friend_requester_name;
  }



}



render() {

    console.log("HELLO");
    console.log("thisstate", this.state);

    return (
        
          <div className="modal_content">
            <span className="close" onClick={this.handleClick}>
              &times;
            </span>
            <div>
              <h3>Select friends to invite</h3>
              <label>
                Name:
                <input type="text" name="name" />
              </label>
              <br />
              <input type="submit" />
              <div>
            
           
           {
             this.state.canInvite.map((item, index) => (
               <div>
                 <label>
                   <input
                     type="checkbox"
                     value={item.friend_name}
                     onChange={()=>this.handleChange(item._id)}
                   /> {this.determineDisplayName(item.user_id, item.friend_requester_name, item.friend_name)}
                 </label>
               </div>
             ))
           }
            
           <br/>
           <input type="submit" value="Submit" />
           <button onClick={this.sendInvitations}>invite</button>
       
        </div>
            </div>
          </div>
        
      );
    }
 
}


export default InviteBookclubPopUp;
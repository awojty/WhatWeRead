import React, { Component } from "react";
import "./InviteBookclubPopUp.css";




class SearchArea extends Component {
  constructor(props) {
    super(props); 
    this.state= { 
        
    }
  }





  render() {

    return (
      <div >

          <form onSubmit={this.props.searchBook} action="">
              <input onChange={this.props.handleSearch} type="text">
              </input>
              <button type="submit">Search</button>
              <select defaultValue = "Sort" onChange={this.props.handelSort}>
                  <option disabled value="Sort">Sort</option>
                  <option value="Newest">Newest</option>
                  <option value="Oldest">Oldest</option>
              </select>
          </form>
        
      </div>
    );
  }}


export default SearchArea;

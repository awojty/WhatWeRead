import React, { Component } from "react";

import Shelf from "./Shelf.js";
import './App.css';


/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} content of the comment
 */


class Painting extends Component {
  constructor(props) {
    super(props); 
  }



  render() {

    return (
      <div className="painting">
        
      </div>
    );
  }}


export default Painting;

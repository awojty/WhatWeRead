import styled, { keyframes } from 'styled-components'
import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { navigate } from "@reach/router";

import "./ProgressBar.css";

class ProgressBar extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    render() {

      console.log("propsm in progrss bar", this.props);
      const fullLength = this.props.total;
      const percentCompleted = Math.round(100*this.props.completed/fullLength);
      const percentBar = Math.min(100, percentCompleted);

      const greyTextAnimation = keyframes`
        from { left: 0; }
        to { left: calc(5px + ${percentBar}%); }
      `

      const whiteTextAnimation = keyframes`
        from { right: 100%; }
        to { right: calc(${100 - percentBar}% + 5px); }
      `

      const GreyBarText = styled.span`
        color: var(--grey);
        position: absolute;
        top: 20%;
        font-weight: bold;
        animation: ${greyTextAnimation} 1s ease-in-out;
        left: calc(5px + ${percentBar}%);
      `

      const WhiteBarText = styled.span`
        color: white;
        position: absolute;
        top: 20%;
        font-weight: bold;
        animation: ${whiteTextAnimation} 1s ease-in-out;
        right: calc(${100 - percentBar}% + 5px);
      `

      return (
        <div className="progress-bar" style={{"width":this.props.width}}>
          <div className="filler" style={{width: `${percentBar}%`}}></div>
          {percentBar < 10 ? <GreyBarText>{percentCompleted +'%'}</GreyBarText> : <WhiteBarText>{percentCompleted +'%'}</WhiteBarText>}
        </div>
      );
    }
  }

export default ProgressBar;
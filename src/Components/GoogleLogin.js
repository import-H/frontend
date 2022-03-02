import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { CLIENT_URL, OAuth } from "../config";

const GoogleLoginBtn = styled.div`
 position: relative;
.google-icon-wrapper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .google-icon {
    /* position: absolute;
    margin-top: 11px;
    margin-left: 11px; */
    width: 18px;
    height: 18px;
    
  }

  & button{
    width: 100%;
    padding: 0.7em 1em;
    background: #fff;
    box-shadow: 0 3px 7px 0px rgb(0 0 0 / 10%);
    border: 1px solid #eee;
    border-radius: 4px;
    font-size: 1.4em;
    cursor: pointer;
    font-weight: 500;
    color: #666;
    transition: all 0.3s;
    &:hover, &:focus{
      border-color: #222;
    }
  }
  }
`;

function GoogleLogin() {
  const oAuthURI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${OAuth.google.client_id}&response_type=${OAuth.google.response_type}&scope=${OAuth.google.scope}&redirect_uri=${CLIENT_URL}/oauth/google`;
  const oAuthHandler = () => {
    window.location.assign(oAuthURI);
    console.log(oAuthURI);
  };

  return (
    <GoogleLoginBtn>
      <button id="oAuthBtn" onClick={oAuthHandler}>
      <div class="google-icon-wrapper">
      <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
    </div>
        구글 로그인
      </button>
    </GoogleLoginBtn>
  );
}

export default GoogleLogin;

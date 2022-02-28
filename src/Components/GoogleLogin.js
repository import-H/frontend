import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import { CLIENT_URL, OAuth } from "../config";

function GoogleLogin() {
  const [data, setData] = useState(null);
  const oAuthURI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${OAuth.google.client_id}&response_type=${OAuth.google.response_type}&scope=${OAuth.google.scope}&redirect_uri=${CLIENT_URL}/login`;
  const oAuthHandler = () => {
    // 1. oAuthURL 정보로 URI 변경
    window.location.assign(oAuthURI);
  };

  return (
    <div>
      <button id="oAuthBtn" onClick={oAuthHandler}>
        구글 로그인
      </button>
    </div>
  );
}

export default GoogleLogin;

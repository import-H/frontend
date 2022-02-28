import React from "react";
import { CLIENT_URL, OAuth } from "../config";
import axios from "axios";

const SocialLogin = ({ type }) => {
  const oAuthURI = `https://github.com/login/oauth/authorize?client_id=${OAuth.github.client_id}&scope=${OAuth.github.scope}&response_type=${OAuth.github.code}&redirect_uri=${CLIENT_URL}/oauth/github`;
  // 2. redirect_uri를 통해 oauth 페이지로 들어가짐
  const oAuthHandler = () => {
    // 1. 소셜 로그인 페이지 들어감
    window.location.assign(oAuthURI);
  };

  return (
    <div>
      <button id="oAuthBtn" onClick={oAuthHandler}>
        {OAuth[type].provider}
      </button>
    </div>
  );
};

export default SocialLogin;

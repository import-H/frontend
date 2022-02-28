import { useState, useEffect } from "react";
import axios from "axios";
import { CLIENT_URL, OAuth } from "../config";

function GithubLogin() {
  const oAuthURI = `https://github.com/login/oauth/authorize?client_id=${OAuth.github.client_id}&scope=${OAuth.github.scope}&response_type=${OAuth.github.code}&redirect_uri=${CLIENT_URL}/login`;
  const oAuthHandler = () => {
    // 1. oAuthURL 정보로 URI 변경
    window.location.assign(oAuthURI);
  };

  return (
    <div>
      <button id="oAuthBtn" onClick={oAuthHandler}>
        깃허브 로그인
      </button>
    </div>
  );
}

export default GithubLogin;

// https://velog.io/@yiyb0603/Nest.js%EC%97%90%EC%84%9C-Github-OAuth-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0 참고할것

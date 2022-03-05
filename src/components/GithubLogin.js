import { useState, useEffect } from "react";
import axios from "axios";
import { CLIENT_URL, OAuth } from "../config";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const GithubLoginBtn = styled.div`
  position: relative;
  .github-icon-wrapper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .github-icon {
    font-size: 2rem;
    color: #fff;
    margin-top: 0.2em;
  }

  & button {
    width: 100%;
    padding: 0.7em 1em;
    background-color: #333;
    box-shadow: 0 3px 7px 0px rgb(0 0 0 / 10%);
    border: 1px solid #eee;
    border-radius: 4px;
    font-size: 1.4em;
    cursor: pointer;
    font-weight: 500;
    color: #666;
    transition: all 0.3s;
    color: #fff;
    @media (max-width: 768px) {
      font-size: 1.3em;
    }
    &:hover,
    &:focus {
      background-color: #555;
      border-color: #222;
    }
  }
`;

function GithubLogin() {
  const oAuthURI = `https://github.com/login/oauth/authorize?client_id=${OAuth.github.client_id}&scope=${OAuth.github.scope}&response_type=${OAuth.github.code}&redirect_uri=${CLIENT_URL}/login`;
  const oAuthHandler = () => {
    // 1. oAuthURL 정보로 URI 변경
    window.location.assign(oAuthURI);
  };

  return (
    <GithubLoginBtn>
      <button id="oAuthBtn" onClick={oAuthHandler}>
        <div className="github-icon-wrapper">
          <FontAwesomeIcon icon={faGithub} className="github-icon" />
        </div>
        깃허브 로그인
      </button>
    </GithubLoginBtn>
  );
}

export default GithubLogin;

// https://velog.io/@yiyb0603/Nest.js%EC%97%90%EC%84%9C-Github-OAuth-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0 참고할것

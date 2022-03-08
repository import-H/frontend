import React from "react";

// config
import { OAuth } from "../../config";

// style
import styled from "styled-components";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Wrapper = styled.div`
  position: relative;
  .icon-wrapper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .google {
    width: 18px;
    height: 18px;
  }
  .github {
    font-size: 2rem;
    color: #fff;
    margin-top: 0.2em;
  }

  & button {
    width: 100%;
    padding: 0.7em 1em;
    box-shadow: 0 3px 7px 0px rgb(0 0 0 / 10%);
    border: 1px solid #eee;
    border-radius: 4px;
    font-size: 1.4em;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s;
    @media (max-width: 768px) {
      font-size: 1.3em;
    }
  }

  // socialType에 따른 버튼 디자인
  .googleBtn {
    background: #fff;
    color: #666;
    &:hover,
    &:focus {
      border-color: #222;
    }
  }

  .githubBtn {
    background-color: #333;
    color: #fff;
    &:hover,
    &:focus {
      background-color: #555;
      border-color: #222;
    }
  }
`;

function SocialAuthBtn({ socialType, oAuthHandler, oAuthURI }) {
  return (
    <Wrapper>
      <button
        id="oAuthBtn"
        onClick={oAuthHandler}
        className={`${socialType}Btn`}
      >
        <div className="icon-wrapper">
          {socialType === "google" && (
            <img
              className={socialType}
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          )}
          {socialType === "github" && (
            <FontAwesomeIcon icon={faGithub} className={socialType} />
          )}
        </div>
        {OAuth[socialType].name}
      </button>
    </Wrapper>
  );
}

export default SocialAuthBtn;

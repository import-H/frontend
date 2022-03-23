import React from "react";

// styled-components
import styled from "styled-components";
import GlobalStyle from "../styles/Globalstyle.js";
import { BigInput, Input, Container } from "../styles/theme.js";

// antd
import "antd/dist/antd.min.css";

import MyPageC from "../containters/mypage/MyPageC";

// style

const MyPageWrapper = styled(Container)`
  & .cardWrap {
    @media (max-width: 768px) {
      flex-direction: column;
    }
    @media (max-width: 500px) {
      font-size: 0.8rem;
    }
  }

  & .card {
    width: 50%;
    padding: 25px 30px;
    background: #fff;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.07);
    margin-right: 30px;

    &:last-child {
      margin-right: 0;
    }

    & h3 {
      font-size: 18px;
      margin-bottom: 25px;
      & svg {
        margin-right: 5px;
      }
    }
    & form {
      flex-grow: 1;
    }

    @media (max-width: 768px) {
      width: 100%;
      margin-bottom: 30px;

      & h3 {
        text-align: center;
      }

      & form input {
        height: 30px;
        border-radius: 3px;
      }
    }
  }

  & .editSubmitBtn {
    margin-left: 10px;
  }

  & .secTit {
    margin-bottom: 50px;
  }

  & .profileImgArea {
    margin-right: 1.5rem;
    & .EditbuttonArea {
      margin-top: 0.5rem;
    }
  }

  & .nicknameArea {
    margin-bottom: 1rem;
    & h1 {
      margin-right: 2px;
    }
  }

  & .introductionArea {
    color: #aaa;

    & h2 {
      font-weight: 400;
      margin-right: 5px;
      margin-bottom: 0;
      color: #aaa;
    }
  }

  & .editIcon {
    padding: 0.5rem;
    color: #333;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      color: var(--point-color-orange);
    }
  }

  & #infoArea {
    flex-grow: 1;
    & .element {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      & .sub {
        font-size: 1.5em;
        font-weight: bold;
        margin-right: 2rem;
      }

      & .editIcon {
        transform: translateX(-1.2rem);
        margin-bottom: 0;
      }

      & .result {
        font-size: 1.5em;
        color: #888;
      }
    }
    & .onoff-switch {
      transform: scale(0.7) translateX(-2rem);
    }

    & .leaveBtnArea {
      margin-top: 5rem;
      @media (max-width: 768px) {
        justify-content: flex-start;
      }
      & .linkBtn {
        margin: 1rem;
        width: 120px;
        background: #aaa;

        &:hover {
          background: var(--point-color-red);
          color: #fff;
        }
      }
    }
  }
`;

const MyPage = () => {
  return (
    <MyPageWrapper>
      <GlobalStyle />
      <MyPageC />
    </MyPageWrapper>
  );
};

export default MyPage;

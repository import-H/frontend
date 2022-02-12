// react
import React from "react";

// react-router-dom
import { Link, useParams } from "react-router-dom";

// style
import GlobalStyle from "../Styles/Globalstyle.js";
import { Container } from "../Styles/theme";
import styled from "styled-components";

// component
import BoardForm from "../Components/BoardForm.js";

// style-compoents
const MenuBar = styled.div`
  width: 80%;
  margin: 0 auto;
  transform: translateX(-20px);
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;

  & a {
    font-size: 1.5em;
    padding: 0 20px;
    position: relative;
    &::after {
      position: absolute;
      display: block;
      content: "";
      width: 1px;
      height: 10px;
      background: #aaa;
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
    }
    &:last-child::after {
      display: none;
    }
  }
  > a:nth-child(1) {
    color: ${props => (props.boardId === "free" ? "var(--secondary-color)" : "black")};
  }
  > a:nth-child(2) {
    color: ${props => (props.boardId === "qna" ? "var(--secondary-color)" : "black")};
  }
`;

const BoardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// main
const Board = () => {
  const boardId = useParams().id;
  const getPostBtn = e => {};
  return (
    <Container>
      <GlobalStyle />
      <BoardWrapper>
        <MenuBar boardId={boardId}>
          <Link to={{ pathname: "/board/free" }}>자유게시판</Link>
          <Link to={{ pathname: "/board/qna" }}>qna 게시판</Link>
        </MenuBar>
        <BoardForm />
      </BoardWrapper>
    </Container>
  );
};

export default Board;

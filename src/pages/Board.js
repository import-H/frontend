// react
import React from "react";

// react-router-dom
import { Link, useParams } from "react-router-dom";

// style
import GlobalStyle from "../styles/Globalstyle.js";
import { Container } from "../styles/theme";
import styled from "styled-components";

// component
import BoardFormC from "../containters/board/BoardFormC.js";

const MenuBar = styled.div`
  width: 80%;
  margin: 0 auto;
  transform: translateX(-20px);
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    transform: unset;
  }

  & * {
    transition: all 0.3s;
  }

  & a {
    font-size: 1.5em;
    padding: 0 20px;
    transition: all 0.3s;
    position: relative;
    @media (max-width: 768px) {
      font-size: 1.3em;
    }
    @media (max-width: 500px) {
      font-size: 1.2em;
    }
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
    color: ${props =>
      props.boardId === "free" ? "var(--secondary-color)" : "black"};
  }
  > a:nth-child(2) {
    color: ${props =>
      props.boardId === "questions" ? "var(--secondary-color)" : "black"};
  }
  > a:nth-child(3) {
    color: ${props =>
      props.boardId === "notice" ? "var(--secondary-color)" : "black"};
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
  return (
    <Container>
      <GlobalStyle />
      <BoardWrapper>
        <MenuBar boardId={boardId}>
          <Link to={{ pathname: "/board/free" }}>자유게시판</Link>
          <Link to={{ pathname: "/board/questions" }}>qna 게시판</Link>
          <Link to={{ pathname: "/board/notice" }}>공지사항</Link>
        </MenuBar>
        <BoardFormC />
      </BoardWrapper>
    </Container>
  );
};

export default Board;

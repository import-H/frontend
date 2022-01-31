// react
import React from "react";

// react-router-dom
import { Link, useParams } from "react-router-dom";

// style
import GlobalStyle from "../styles/Globalstyle.js";
import { Container } from "../styles/theme";
import styled from "styled-components";

// component
import BoardForm from "../components/BoardForm.js";

// style-compoents
const MenuBar = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  * {
    padding: 20px;
  }
  > a:nth-child(1) {
    color: ${props => (props.boardId === "free" ? "blue" : "black")};
  }
  > a:nth-child(2) {
    color: ${props => (props.boardId === "qna" ? "blue" : "black")};
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

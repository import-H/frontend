import React from "react";
// api가 아직 정해지지 않아 임시로 samplePosts 만들어둠

import GlobalStyle from "../Styles/Globalstyle.js";
import { Container } from "../Styles/theme";
import { Viewer } from "@toast-ui/react-editor";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BoardForm from "../Components/BoardForm.js";
import { useParams } from "react-router-dom";

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

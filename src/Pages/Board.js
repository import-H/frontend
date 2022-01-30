import React from "react";
// api가 아직 정해지지 않아 임시로 samplePosts 만들어둠

import GlobalStyle from "../Styles/Globalstyle.js";
import { Container } from "../Styles/theme";
import { Viewer } from "@toast-ui/react-editor";

import { Link } from "react-router-dom";
import BoardForm from "../Components/BoardForm.js";

const samplePosts = [
  {
    id: 1,
    title: "title",
    content: "content",
    thumbnail: "",
    create_at: "2022-01-21",
    author: "자몽",
    view: 3,
    like: 2,
    comments: [],
  },
  {
    id: 2,
    title: "프로그래밍 스터디 이름",
    content: "프로그래밍 스터디 이름은 `import_H`입니다.!!",
    thumbnail: "",
    create_at: "2022-01-21",
    author: "자몽",
    view: 3,
    like: 2,
    comments: ["123123", "123123"],
  },
];

const Board = () => {
  //const nickname = useSelector(state => state.post.nickname);
  const getPostBtn = e => {};
  return (
    <Container>
      <GlobalStyle />
      <Link to={{ pathname: "/board/free" }}>자유게시판</Link>
      <Link to={{ pathname: "/board/qna" }}>qna 게시판</Link>
      <Link to={{ pathname: "/board/personal" }}>개인 활동 게시판</Link>

      <BoardForm />
    </Container>
  );
};

export default Board;

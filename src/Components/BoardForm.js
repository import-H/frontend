import React from "react";
// api가 아직 정해지지 않아 임시로 samplePosts 만들어둠

import GlobalStyle from "../Styles/Globalstyle.js";
import { Container } from "../Styles/theme";
import { Viewer } from "@toast-ui/react-editor";

import { Link, useParams } from "react-router-dom";

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

const BoardForm = () => {
  //const nickname = useSelector(state => state.post.nickname);
  const getPostBtn = e => {};
  const boardId = useParams().id;
  return (
    <Container>
      <GlobalStyle />
      <Link to={{ pathname: `/write/${boardId}` }}>글 작성하기</Link>
      <div>{boardId}</div>
      <div>
        {samplePosts.map(post => (
          <Link to={{ pathname: "/posts" }}>
            <div
              style={{
                border: "1px solid black",
                padding: 20,
                margin: 20,
                cursor: "pointer",
              }}
            >
              <div>제목: {post.title}</div>
              <Viewer initialValue={post.content} />
              <div>만든이: {post.author}</div>
              <div>생성 시간: {post.create_at}</div>
              <div>작성자: {post.author}</div>
              <div>좋아요: {post.like}</div>
              <div>댓글: {post.comments.length}</div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default BoardForm;

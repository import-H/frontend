import React, { useEffect } from "react";
import GlobalStyle from "../Styles/Globalstyle.js";
import { Container } from "../Styles/theme";
import { Viewer } from "@toast-ui/react-editor";

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

const Post = () => {
  return (
    <Container>
      <GlobalStyle />
      <div stlye={{ display: "flex", flexDirection: "column" }}>
        {samplePosts.map(post => (
          <div style={{ border: "1px solid black", padding: 20, margin: 20 }}>
            <div>제목: {post.title}</div>
            <Viewer initialValue={post.content} />
            <div>만든이: {post.author}</div>
            <div>생성 시간: {post.create_at}</div>
            <div>작성자: {post.author}</div>
            <div>좋아요: {post.like}</div>
            <div>댓글: {post.comments.length}</div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Post;

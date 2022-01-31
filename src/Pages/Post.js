// react
import React, { useEffect } from "react";

// redux
import { useDispatch } from "react-redux";
import { getPost } from "../reducers/slices/postSlice.js";

// react-router-dom
import { Link, useParams } from "react-router-dom";

// style
import GlobalStyle from "../styles/Globalstyle.js";
import { Container } from "../styles/theme";
import styled from "styled-components";

// toast-ui editor
import { Viewer } from "@toast-ui/react-editor";

// sample data
const samplePost = {
  id: 1,
  title: "title",
  content:
    "# hi \n## this is \n### content123123 `hi` \n 123123 \n* 1\n * 222\n * 33333",
  create_at: "2022-01-21",
  author: "자몽",
  tags: ["자바스크립트", "리액트", "스프링"],
  view: 3,
  like: 2,
  comments: [
    { author: "김방울", content: "우와" },
    { author: "Dever", content: "댓글 샘플2" },
  ],
};

// main
const Post = () => {
  const boardId = useParams().boardId;
  const postId = useParams().postId;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getPost({
        postId: postId,
        boardId: boardId,
      }),
    );
  }, []);
  return (
    <Container>
      <GlobalStyle />
      <div>
        <div>
          <div>title: {samplePost.title}</div>
          <div>
            tags:
            {samplePost.tags.map(tag => (
              <span>{tag},</span>
            ))}
          </div>

          <div>
            <h3>user Info(이부분은 지울것)</h3>
            <div>author: {samplePost.author}</div>
            <div>authorImg: 프로필 이미지</div>
            <hr />
          </div>
          <div>viewCount: {samplePost.view}</div>
          <div>date: {samplePost.create_at}</div>
          <Viewer initialValue={samplePost.content} />
        </div>
        <div>
          <h1>사이드바(이부분은 지울것)</h1>
          <div>like: {samplePost.like}</div>
        </div>
        <hr />
        <h1>comments(이부분은 지울것)</h1>
        <div>
          {samplePost.comments.map((comment, id) => (
            <div>
              <div>content: {comment.content}</div>
              <div>author: {comment.author}</div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Post;

// react
import React from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../reducers/slices/postSlice";

import styled from "styled-components";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  //justify-content: center;
`;

const PostWrapper = styled.div`
  width: calc(100% / 4);
  min-width: 30rem;
  height: 20rem;
  display: flex;
  padding: 1rem;
`;

const Post = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #bdbdbd;
  border-radius: 7px;
  padding: 1rem;

  & .title {
    font-size: 2rem;
    flex: 2;
  }
  & .content {
    flex: 3;
  }

  & .author {
    flex: 1;
  }
`;

const samplePosts = [
  {
    id: 1,
    title: "sample",
    content: "sample post is good asdfjaslfjasdlfkj",
    author: "자몽",
  },
  {
    id: 2,
    title: "sample2",
    content: "sample post2 is good asdfjaslfjasdlfkj",
    author: "자몽",
  },
  {
    id: 3,
    title: "sample3",
    content: "sample post2 is good asdfjaslfjasdlfkj",
    author: "자몽",
  },
  {
    id: 4,
    title: "sample34",
    content: "sample post2 is good asdfjaslfjasdlfkj",
    author: "자몽",
  },
  {
    id: 1,
    title: "sample",
    content: "sample post is good asdfjaslfjasdlfkj",
    author: "자몽",
  },
  {
    id: 2,
    title: "sample2",
    content: "sample post2 is good asdfjaslfjasdlfkj",
    author: "자몽",
  },
  {
    id: 3,
    title: "sample3",
    content: "sample post2 is good asdfjaslfjasdlfkj",
    author: "자몽",
  },
  {
    id: 4,
    title: "sample34",
    content: "sample post2 is good asdfjaslfjasdlfkj",
    author: "자몽",
  },
];

const Main = () => {
  const dispatch = useDispatch();
  const nickname = useSelector(state => state.post.nickname);
  const userBtn = () => {
    dispatch(getUser());
  };
  return (
    <MainWrapper style={{ marginTop: "2rem" }}>
      {samplePosts.map(post => (
        <PostWrapper>
          <Post>
            <div className="title">{post.title}</div>
            <div className="content">{post.content}</div>
            <div className="author">{post.author}</div>
          </Post>
        </PostWrapper>
      ))}
    </MainWrapper>
  );
};

export default Main;

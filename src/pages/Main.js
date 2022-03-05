// react
import React, { useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slices/postSlice";

import { Link } from "react-router-dom";

import styled, { keyframes } from "styled-components";
import { getMainPosts } from "../redux/slices/mainSlice";

const iconAni = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(25deg);
  }
`;

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  & .secTit {
    font-size: 2.8rem;
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 500;
    text-align: center;
    width: 100%;
    margin-bottom: 3rem;
    transition: all 0.3s;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    & > div {
      transform: translateX(2px) translateY(-3px);
    }
    & .icon {
      display: inline-block;
      font-size: 1.2em;
      transform-origin: right bottom;
      animation: ${iconAni} 2s alternate infinite;
    }
  }
  & .postArea {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    & > div {
      @media (max-width: 1200px) {
        flex-grow: 1;
        width: 50%;
      }
      @media (max-width: 768px) {
        width: 100%;
      }
    }
  }
`;

const PostWrapper = styled.div`
  //width: calc(100% / 4);
  //min-width: 30rem;
  width: 30rem;
  height: 20rem;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  @media (max-width: 1200px) {
    width: 100%;
  }
  @media (max-width: 768px) {
    padding: 1rem 0;
    margin-bottom: 1rem;
  }
`;

const Post = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 7px;
  padding: 1rem;
  box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.07);

  & * {
    transition: all 0.3s;
  }

  & .title {
    font-size: 2rem;
    flex: 2;
  }
  & .content {
    flex: 3;
    @media (max-width: 1200px) {
      font-size: 1.4em;
    }
    @media (max-width: 500px) {
      font-size: 1.3em;
    }
  }

  & .author {
    flex: 1;
    text-align: right;
    @media (max-width: 1200px) {
      font-size: 1.2em;
    }
    @media (max-width: 768px) {
      text-align: right;
    }
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
  {
    id: 5,
    title: "TestTestTestTestTestTestTestTestTestTestTestTestTestTestTest",
    content: "sample post2 is good asdfjaslfjasdlfkj",
    author: "자몽",
  },
];

const Main = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.main.posts);

  useEffect(() => {
    dispatch(getMainPosts(0));
  }, []);
  return (
    <MainWrapper>
      <h2 className="secTit flex flex-jc-c">
        지금 인기있는 글들
        <div>
          <span className="icon">&#128075;</span>
        </div>
      </h2>
      <div className="postArea flex">
        {posts?.length
          ? posts.map((post, index) => (
              <div key={index}>
                <Link
                  to={`/board/${post.responseInfo.boardId}/${post.responseInfo.postId}`}
                >
                  <PostWrapper>
                    <Post>
                      <div className="title">{post.responseInfo.title}</div>
                      <div className="content">
                        {post.responseInfo.content.slice(0, 100)}
                      </div>
                      <div className="author">{post.responseInfo.nickname}</div>
                    </Post>
                  </PostWrapper>
                </Link>
              </div>
            ))
          : samplePosts.map((post, index) => (
              <PostWrapper key={index}>
                <Post>
                  <div className="title">
                    {post.title.slice(0, 20)}
                    {post.title.length >= 20 ? "..." : ""}
                  </div>
                  <div className="content">{post.content}</div>
                  <div className="author">{post.author}</div>
                </Post>
              </PostWrapper>
            ))}
      </div>
    </MainWrapper>
  );
};

export default Main;

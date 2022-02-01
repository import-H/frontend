import React, { useEffect } from "react";
// api가 아직 정해지지 않아 임시로 samplePosts 만들어둠

import GlobalStyle from "../Styles/Globalstyle.js";
import { Container } from "../Styles/theme";
import { Viewer } from "@toast-ui/react-editor";
import styled from "styled-components";

import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../reducers/slices/postSlice.js";

const BoardWrap = styled.div`
  width: 80%;
`;

const BoardList = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  margin-bottom: 2em;

  & .toastui-editor-contents p {
    font-size: 1.1em;
    margin: 15px 0;
    color: #888;
  }
  & .commentWrap {
    font-size: 1.2em;
  }

  & .commentWrap svg {
    margin-right: 2px;
  }

  & .boardAuthor {
    font-weight: 500;
    font-size: 1.4em;
    margin-top: 5px;
  }

  & .boardLike,
  & .boardComment {
    margin: 0 5px;
    margin-top: 1px;
  }
  & .boardComment {
  }
`;
const BoardTitle = styled.div`
  font-size: 2.2em;
  font-weight: 500;
  display: flex;
  justify-content: space-between;

  & .date {
    display: block;
    font-size: 0.6em;
    color: #666;
  }
`;

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
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.posts);
  const boardId = useParams().id;

  useEffect(() => {
    dispatch(getPosts(boardId));
    console.log("getposts");
  }, []);
  return (
    <>
      <GlobalStyle />
      <BoardWrap>
        <Link to={{ pathname: `/write/${boardId}` }}>글 작성하기</Link>
        <div>
          {posts?.map(post => (
            <Link
              to={{ pathname: `/board/${boardId}/${post.id}` }}
              key={post.id}
            >
              <BoardList>
                <BoardTitle>
                  {post.title}
                  {/* 제목 */}
                  <span className="date">{post.create_at}</span>
                  {/* 생성 시간 */}
                </BoardTitle>
                {/* 글쓴이 */}
                <div className="boardAuthor">{post.author}</div>
                <Viewer initialValue={post.content} />
                <div className="commentWrap flex flex-ai-c">
                  {/* 좋아요 */}
                  <div className="boardLike">
                    <FontAwesomeIcon icon={faHeart} />
                    {post.like}
                  </div>
                  {/* 코멘트 */}
                  <div className="boardComment">
                    <FontAwesomeIcon icon={faCommentAlt} />{" "}
                    {post.comments.length}
                  </div>
                </div>
              </BoardList>
            </Link>
          ))}
          {posts?.length === 0 ? (
            <></>
          ) : (
            samplePosts.map(post => (
              <Link
                to={{ pathname: `/board/${boardId}/${post.id}` }}
                key={post.id}
              >
                <BoardList>
                  <BoardTitle>
                    {post.title}
                    {/* 제목 */}
                    <span className="date">{post.create_at}</span>
                    {/* 생성 시간 */}
                  </BoardTitle>
                  {/* 글쓴이 */}
                  <div className="boardAuthor">{post.author}</div>
                  <Viewer initialValue={post.content} />
                  <div className="commentWrap flex flex-ai-c">
                    {/* 좋아요 */}
                    <div className="boardLike">
                      <FontAwesomeIcon icon={faHeart} />
                      {post.like}
                    </div>
                    {/* 코멘트 */}
                    <div className="boardComment">
                      <FontAwesomeIcon icon={faCommentAlt} />{" "}
                      {post.comments.length}
                    </div>
                  </div>
                </BoardList>
              </Link>
            ))
          )}
        </div>
      </BoardWrap>
    </>
  );
};

export default BoardForm;

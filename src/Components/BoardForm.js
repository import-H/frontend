// react
import React, { useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

// react-router-dom
import { Link, useParams } from "react-router-dom";

// toast-ui viewer
import { Viewer } from "@toast-ui/react-editor";

// tools
import { timeElapsed } from "../utils/tools.js";

// style
import GlobalStyle from "../Styles/Globalstyle.js";
import styled from "styled-components";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { getPosts } from "../reducers/slices/postSlice.js";

import { API_URL } from "../config.js";
const BoardWrap = styled.div`
  width: 80%;
  padding: 20px 0;

  & .writeBtn {
    display: inline-block;
    margin-bottom: 20px;

    &:last-of-type {
      margin-top: 20px;
    }
  }
`;

const BoardList = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
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

  &:hover .boardTitle {
    color: var(--point-color-orange);
  }
`;
const BoardTitle = styled.div`
  font-size: 2.2em;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  transition: all 0.3s;

  & .date {
    display: block;
    font-size: 0.6em;
    color: #666;
  }
`;

const ImgArea = styled.div`
  margin-right: 1rem;
  flex: 1;
  height: 12rem;
  width: 25rem;

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const ContentArea = styled.div`
  flex: 3;
`;

const BoardForm = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.posts);
  const isAuth = useSelector(state => state.auth.isAuth);
  const boardId = useParams().id;

  // 게시글 목록에서 게시글 formatting
  const simplyContent = content => {
    if (content.length >= 100) content = content.slice(0, 100) + "...";

    const regex = /!\[Image\]\([\w\/:]+\)/;
    let imgStr;
    while ((imgStr = content.match(regex)) !== null) {
      content = content.replace(imgStr[0], "");
    }
    content = content
      .replaceAll("#", "")
      .replaceAll("*", "")
      .replaceAll("\n", "");

    return content;
  };

  useEffect(async () => {
    await dispatch(getPosts(boardId));
  }, [boardId]);
  return (
    <>
      <GlobalStyle />
      <BoardWrap>
        <div>
          {posts &&
            posts.map(post => (
              <Link
                to={{
                  pathname: `/board/${boardId}/${post.responseInfo.postId}`,
                }}
                key={post.responseInfo.postId}
              >
                <BoardList>
                  {post.thumbnail && (
                    <ImgArea>
                      <img
                        src={`${API_URL}/v1/file/upload/${post.thumbnail}`}
                      />
                    </ImgArea>
                  )}
                  <ContentArea>
                    <BoardTitle className="boardTitle">
                      {post.responseInfo.title}
                      {/* 제목 */}
                      <span className="date">
                        {timeElapsed(post.responseInfo.createdAt)}
                      </span>
                      {/* 생성 시간 */}
                    </BoardTitle>
                    {/* 글쓴이 */}
                    <div className="boardAuthor">
                      {post.responseInfo.author}
                    </div>
                    <Viewer
                      initialValue={simplyContent(post.responseInfo.content)}
                    />
                    <div className="commentWrap flex flex-ai-c">
                      {/* 좋아요 */}
                      <div className="boardLike">
                        <FontAwesomeIcon icon={faHeart} />
                        {post.responseInfo.likeCount}
                      </div>
                      {/* 댓글 */}
                      <div className="boardComment">
                        <FontAwesomeIcon icon={faCommentAlt} />{" "}
                        {post.commentsCount}
                      </div>
                    </div>
                  </ContentArea>
                </BoardList>
              </Link>
            ))}
        </div>
        <div className="flex flex-jc-e">
          {isAuth && (
            <Link
              to={{ pathname: `/write/${boardId}` }}
              className="writeBtn linkBtn black"
            >
              글 작성하기
            </Link>
          )}
        </div>
      </BoardWrap>
    </>
  );
};

export default BoardForm;

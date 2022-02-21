// react
import React, { useEffect, useState } from "react";

// toast-ui viewer
import { Viewer } from "@toast-ui/react-editor";

// style
import GlobalStyle from "../Styles/Globalstyle.js";
import { Container } from "../Styles/theme";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import Comment from "../Components/Comment.js";
import WritePersonalPost from "../Components/WritePersonalPost.js";
import { useDispatch, useSelector } from "react-redux";
import { getPost, getPosts } from "../reducers/slices/postSlice.js";

// style
const BoardWrap = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const BoardList = styled.div`
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

const FirstAction = styled.div`
  margin-top: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
`;

const PersonalBoard = () => {
  const dispatch = useDispatch();
  const personId = useParams().personId;
  const status = useSelector(state => state.post.status);
  const posts = useSelector(state => state.post.posts);
  const currentPost = useSelector(state => state.post.post);
  const [showDetailPost, setShowDetailPost] = useState();

  const onDetailPost = async postId => {
    if (postId === showDetailPost) {
      setShowDetailPost("");
    } else {
      await dispatch(getPost(postId));
      setShowDetailPost(postId);
    }
  };

  useEffect(async () => {
    if (status !== "success") {
      await dispatch(getPosts(personId));
    }
  }, [status]);

  return (
    <Container>
      <GlobalStyle />
      <BoardWrap>
        {posts &&
          (posts.length ? (
            posts.map(post => (
              <div key={post.responseInfo.postId}>
                <BoardList
                  onClick={() => {
                    onDetailPost(post.responseInfo.postId);
                  }}
                >
                  <BoardTitle>
                    {post.responseInfo.title}
                    {/* 제목 */}
                    <span className="date">{post.responseInfo.createdAt}</span>
                    {/* 생성 시간 */}
                  </BoardTitle>
                  {/* 글쓴이 */}
                  <div className="boardAuthor">
                    {post.responseInfo.nickname}
                  </div>
                  <Viewer initialValue={post.responseInfo.content} />
                  <div className="commentWrap flex flex-ai-c">
                    {/* 좋아요 */}
                    <div className="boardLike">
                      <FontAwesomeIcon icon={faHeart} />
                      {post.like}
                    </div>
                    {/* 코멘트 */}
                    <div className="boardComment">
                      <FontAwesomeIcon icon={faCommentAlt} />{" "}
                      {post.commentsCount}
                    </div>
                  </div>
                </BoardList>
                {showDetailPost === post.responseInfo.postId &&
                  currentPost?.responseInfo?.postId ===
                    post.responseInfo.postId && (
                    <Comment postId={post.responseInfo.postId} />
                  )}
              </div>
            ))
          ) : (
            <FirstAction>첫 활동을 기록해주세요 📄 </FirstAction>
          ))}
        <WritePersonalPost personId={personId} />
      </BoardWrap>
    </Container>
  );
};

export default PersonalBoard;

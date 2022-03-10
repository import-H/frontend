// react
import React, { useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  getPost,
  deletePost,
  editLike,
  addLike,
  deleteLike,
} from "../redux/slices/postSlice.js";

// react-router-dom
import { Link, useParams, useNavigate } from "react-router-dom";

// style
import GlobalStyle from "../styles/Globalstyle.js";
import { Container } from "../styles/theme";
import styled from "styled-components";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faUser,
  faEye,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

// toast-ui editor
import { Viewer } from "@toast-ui/react-editor";
import Comment from "../components/Comment.js";

// tools
import { timeElapsed } from "../utils/tools.js";

import noneProfileImg from "../images/none_profile_image.png";

// style
const PostView = styled.div`
  width: 80%;
  margin: 0 auto;
  position: relative;

  @media (max-width: 1200px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }

  /* 하단 수정 버튼 */
  & .btnWrap {
    margin-top: 34px;
    & .linkBtn {
      display: inline-block;
      margin-right: 10px;
      cursor: pointer;
      word-break: keep-all;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

const PostHead = styled.div`
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  & .postInfo {
    margin-bottom: 3.4rem;
    @media (max-width: 1200px) {
      margin-bottom: 2.4rem;
    }
    @media (max-width: 768px) {
      margin-bottom: 2rem;
    }
    & .postTitle {
      font-size: 4em;
      font-weight: 600;

      @media (max-width: 1200px) {
        font-size: 3rem;
      }
      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }
    & .infoWrap {
      font-size: 1.4em;
      color: #aaa;
      @media (max-width: 768px) {
        font-size: 1.2em;
      }
      & span {
        margin-right: 15px;
        &:last-child {
          margin-right: 0;
        }
      }
      & svg {
        display: inline-block;
        margin-right: 3px;
      }
    }
  }

  & .postTag {
    & > span {
      padding: 5px 7px;
      margin-right: 15px;
      border-radius: 5px;
      background: #ddd;
      color: #666;
      font-size: 1.1em;
      @media (max-width: 768px) {
        margin-right: 7px;
      }
    }
    &::before {
      content: "Tags";
      display: inline-block;
      margin-right: 15px;
      color: #666;
      font-size: 1.2em;
    }
  }
`;

const PostContent = styled.article`
  padding: 20px 0;
  /* 토스트ui viewer */
  .toastui-editor-contents {
    font-size: 1.6em;
    @media (max-width: 768px) {
      font-size: 1.4em;
    }
  }
`;

const UserInfo = styled.div`
  padding: 20px 0;

  & .authorName {
    font-size: 1.6em;
    margin-right: 10px;
    font-weight: 500;
    @media (max-width: 768px) {
      font-size: 1.4em;
    }
  }
`;

const AuthorImg = styled.div`
  width: 60px;
  height: 60px;
  background: #ddd;
  border-radius: 100%;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const SideBar = styled.div`
  position: fixed;
  top: 40%;
  left: 50px;
  @media (max-width: 768px) {
    top: unset;
    bottom: 50px;
    left: unset;
    right: 20px;
  }
`;

const LikeWrap = styled.div`
  padding: 15px;
  border: 1px solid #aaa;
  border-radius: 100%;
  background: #fff;
  cursor: pointer;

  & svg {
    color: ${props => (props.Liked ? "#FF4444" : "#aaa")};
    font-size: 2.6em;
    display: block;
    transition: color 0.3s, transform 0.3s, opacity 0.3s;
    margin-bottom: -2px;
  }

  &:hover svg {
    transform: scale(0.85);
    transform-origin: center;
    opacity: 0.8;
    color: ${props => (props.Liked ? "aaa" : "#FF4444")};
  }

  & .num {
    color: #222;
    position: absolute;
    font-size: 1.3em;
    top: 105%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    &::after {
      content: "Likes";
      display: inline-block;
      margin-left: 3px;
      color: #aaa;
    }
  }
`;

// main
const Post = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const status = useSelector(state => state.post?.status);
  const profile = useSelector(state => state.user?.profile);

  const [post, setPost] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const boardId = useParams().boardId;
  const postId = useParams().postId;

  const onDeletePost = () => {
    dispatch(deletePost({ boardId, postId }));
    navigate(-1);
  };

  const onClickLike = e => {
    e.preventDefault();
    if (isAuth) {
      post.like ? dispatch(deleteLike(postId)) : dispatch(addLike(postId));
    }
  };

  useEffect(async () => {
    try {
      const postdata = await dispatch(getPost(postId)).unwrap();

      setPost(postdata);
    } catch (e) {
      alert(e);
    }
  }, [status]);

  return (
    <Container>
      <GlobalStyle />
      {post && (
        <PostView>
          <PostHead>
            <div className="postInfo flex flex-jc-b flex-ai-c">
              {/* 게시물 제목 */}
              <div className="postTitle">{post.responseInfo.title}</div>
              <div className="infoWrap">
                {/* 조회수 */}
                <span>
                  <FontAwesomeIcon icon={faEye} />
                  {post.responseInfo.viewCount}
                </span>
                {/* 글 등록 시각 */}
                <span>
                  <FontAwesomeIcon icon={faClock} />{" "}
                  {timeElapsed(post.responseInfo.createdAt)}
                </span>
              </div>
            </div>

            {/* 태그 */}
            <div className="postTag">
              {post.responseInfo.tags.map(tag => (
                <span key={tag.name}>{tag.name}</span>
              ))}
            </div>
          </PostHead>

          {/* 게시물 본문 */}
          <PostContent>
            <Viewer initialValue={post.responseInfo.content} />
          </PostContent>

          {/* 작성자 정보 */}
          <UserInfo className="flex flex-ai-c flex-jc-e">
            {/* 작성자 이름 */}
            <div className="authorName">{post.responseInfo.nickname}</div>
            {/* 프로필 이미지 */}
            <AuthorImg>
              {profile?.profileImage ? (
                <img src={profile?.profileImage} alt="profileImg" />
              ) : (
                <img src={noneProfileImg} />
              )}
            </AuthorImg>
          </UserInfo>

          {/* 댓글 */}
          <Comment post={post} postId={postId} />

          {/* 사이드바 */}
          <SideBar>
            {/* 좋아요 */}
            <LikeWrap Liked={post.like} onClick={onClickLike}>
              <FontAwesomeIcon icon={faHeart} />
              <span className="num"> {post.responseInfo.likeCount}</span>
            </LikeWrap>
          </SideBar>

          {/* 수정, 삭제버튼 */}
          {isAuth && (
            <div className="btnWrap flex flex-jc-e">
              <Link
                className="linkBtn black"
                to={{ pathname: `/edit/${boardId}/${postId}` }}
              >
                수정
              </Link>
              <div className="linkBtn black" onClick={onDeletePost}>
                삭제
              </div>
            </div>
          )}
        </PostView>
      )}
    </Container>
  );
};

export default Post;

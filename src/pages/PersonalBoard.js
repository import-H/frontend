// react
import React, { useEffect, useState } from "react";

// toast-ui viewer
import { Viewer } from "@toast-ui/react-editor";

// style
import GlobalStyle from "../styles/Globalstyle.js";
import { Container } from "../styles/theme";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import Comment from "../components/post/Comment.js";
import WritePersonalPost from "../components/WritePersonalPost.js";
import { useDispatch, useSelector } from "react-redux";
import { getPost, getPosts } from "../redux/slices/postSlice.js";
import { timeElapsed } from "../utils/tools.js";
import PersonalPostWrite from "../components/postEdit/PersonalPostWrite.js";
import PostWriteC from "../containters/postEdit/PostWriteC.js";

// style
const BoardWrap = styled.div`
  width: 80%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const BoardList = styled.div`
  cursor: pointer;
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
  box-sizing: border-box;
  border-top: 1px solid #ddd;
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

// style
const WriteContainer = styled(Container)`
  & .tagCon {
    margin: 10px 0;
    margin-top: 25px;
    & .tagArea {
      margin: 10px 0;
      font-size: 1.2em;
      flex-wrap: wrap;

      & .postTag {
        padding: 5px 7px;
        margin-bottom: 7px;
        margin-right: 15px;
        border-radius: 5px;
        background: #ddd;
        color: #666;
        font-size: 1.1em;
      }
    }
  }

  & .toastui-editor-defaultUI {
    margin: 12px 0;
  }

  & .submitArea {
    @media (max-width: 768px) {
      justify-content: center;
    }
  }

  & .linkBtn {
    padding: 7px 30px;
    font-size: 1.2em;
  }
`;

const PersonalBoard = () => {
  const dispatch = useDispatch();
  const personId = useParams().personId;
  const [posts, setPosts] = useState([]);
  const userPathId = useSelector(state => state?.user?.profile?.pathId);
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
    try {
      const postdata = await dispatch(getPosts(personId)).unwrap();
      // console.log("data", postdata);
      setPosts(postdata.posts);
    } catch (e) {
      alert(e);
    }
  }, []);

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
                    {/* 제목 */}
                    {post.responseInfo.title}
                    {/* 생성 시간 */}
                    <span className="date">
                      {timeElapsed(post.responseInfo.createdAt)}
                    </span>
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
        <WriteContainer>
          <PostWriteC shape="half" id={personId} />
        </WriteContainer>
      </BoardWrap>
    </Container>
  );
};

export default PersonalBoard;

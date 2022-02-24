// react
import React, { useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  editComment,
  deleteComment,
  getPost,
} from "../reducers/slices/postSlice.js";

// font
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

// styled-components
import styled from "styled-components";

// style
const CommentWrap = styled.div`
  border-top: 1px solid #ddd;
  padding: 20px 0;
  & h3 {
    font-size: 1.8em;
    margin-bottom: 15px;
    & span {
      color: var(--point-color-orange);
    }
  }

  & .comment {
    font-size: 1.5em;
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 7px;
    margin-bottom: 10px;

    & .commentContent {
      margin: 1rem;
      margin-top: 0.2rem;
      color: #333;
    }
    & .commentEdit {
      resize: none;
      width: 100%;
      height: 5rem;
      border: 1px solid #ccc;
      font-size: 1.4rem;
      border-radius: 4px;
      outline: none;
      padding: 10px 15px;
      font-family: "Noto Sans KR", sans-serif;
    }

    & .commentCreateAt {
      color: #a5a7a9;
      font-size: 1.3rem;
      margin: 1rem;
      margin-bottom: 0;
    }
  }
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & .commentAuthor {
    font-weight: 600;
    margin-bottom: 5px;
    & svg {
      font-size: 0.9em;
      margin-right: 5px;
    }
  }

  & .commentBtnArea {
    display: flex;
    flex-direction: row;
    div {
      cursor: pointer;
      padding-left: 1rem;
      font-size: 0.9em;
      transition: all 0.3s;

      &:hover {
        color: var(--point-color-orange);
      }
    }
  }
`;

const CommentPush = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  & .commentWrite {
    flex: 15;
    font-family: "Noto Sans KR", sans-serif;
    resize: none;
    heigth: 5rem;
    padding: 10px 15px;
    margin: 2px;
    border: 1px solid #ccc;
    font-size: 1.4rem;
    border-radius: 4px;
    outline: none;
  }
  .linkBtn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
    height: 4.3rem;
    cursor: pointer;
  }
`;

const Comment = ({ postId }) => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.post.status);

  const isAuth = useSelector(state => state.auth.isAuth);
  const comments = useSelector(state => state.post.post.comments);

  const userNickname = useSelector(state => state?.user?.profile?.nickname);
  const [commentData, setCommentData] = useState("");
  const [commentEdit, setCommentEdit] = useState({
    id: "",
    content: "",
  });

  useEffect(() => {
    if (status !== "success") {
      dispatch(getPost(postId));
    }
  }, [status]);

  // 댓글 등록
  const onPostComment = async () => {
    await dispatch(addComment({ postId, commentData }));
    setCommentData("");
  };

  // 댓글 제거
  const onRemoveComment = commentId => {
    dispatch(deleteComment({ postId, commentId }));
  };

  // 댓글 수정
  const onEditComment = async (commentId, content) => {
    if (commentEdit.id !== "") {
      await dispatch(
        editComment({ postId, commentId, content: commentEdit.content }),
      );
      setCommentEdit({ id: "", content: "" });
    } else {
      setCommentEdit({ id: commentId, content: content });
    }

    //
  };

  const onChangeComment = e => {
    setCommentData(e.target.value);
  };

  return (
    <CommentWrap>
      {comments && (
        <>
          <h3 title="comment">
            <span>{comments.length}</span> Comment
          </h3>
          {comments.map(comment => (
            <div
              className="comment"
              key={comment.id} //api 문서대로 id, createAt, account 추가해야함
            >
              {/* 댓글 작성자 */}
              <CommentInfo>
                <div className="commentAuthor">
                  <FontAwesomeIcon icon={faUser} />
                  {comment.nickname}
                </div>
                {comment.nickname === userNickname && (
                  <div className="commentBtnArea">
                    {/* 댓글 삭제 */}
                    <div
                      onClick={() => {
                        onRemoveComment(comment.id);
                      }}
                    >
                      삭제
                    </div>

                    {/* 댓글 수정 */}
                    <div
                      onClick={() => {
                        onEditComment(comment.id, comment.content);
                      }}
                    >
                      수정
                    </div>
                  </div>
                )}
              </CommentInfo>

              {/* 댓글 내용 */}
              {commentEdit.id !== comment.id ? (
                <div className="commentContent">{comment.content}</div>
              ) : (
                <textarea
                  className="commentEdit"
                  value={commentEdit.content}
                  onChange={e => {
                    setCommentEdit({ ...commentEdit, content: e.target.value });
                  }}
                />
              )}

              <div className="commentCreateAt">2020.01.02</div>
            </div>
          ))}
          {isAuth ? (
            <CommentPush>
              <textarea
                className="commentWrite"
                placeholder="댓글을 작성하세요"
                onChange={onChangeComment}
                value={commentData}
              />

              <div className="linkBtn black" onClick={onPostComment}>
                댓글 작성
              </div>
            </CommentPush>
          ) : (
            <></>
          )}
        </>
      )}
    </CommentWrap>
  );
};

export default Comment;

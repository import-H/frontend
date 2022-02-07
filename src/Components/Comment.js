// react
import React, { useState } from "react";

// redux
import { useDispatch } from "react-redux";
import {
  addComment,
  editComment,
  deleteComment,
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
      color: #ff6c26;
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
      color: #333;
    }
    & .commentEdit {
      resize: none;
      width: 100%;
      heigth: 5rem;
      padding: 2px;
      margin: 2px;
      border: 1px solid #ccc;
      font-size: 1.4rem;
      border-radius: 7px;
      outline: none;
    }

    & .commentCreateAt {
      color: #a5a7a9;
      font-size: 1.3rem;
    }
  }
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direaction: row;
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
    }
  }
`;

const CommentPush = styled.div`
  width: 100%;
  display: flex;
  flex-direction: height;
  align-items: center;

  & .commentWrite {
    flex: 15;
    resize: none;
    heigth: 5rem;
    padding: 5px;
    margin: 2px;
    border: 1px solid #ccc;
    font-size: 1.4rem;
    border-radius: 7px;
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

const Comment = ({ post, postId }) => {
  const dispatch = useDispatch();
  const [commentData, setCommentData] = useState("");
  const [commentEdit, setCommentEdit] = useState({
    id: "",
    content: "",
  });

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
      console.log(commentEdit.content);
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
      <h3>
        <span>{post.comments.length}</span> Comment
      </h3>
      {post.comments.map((comment, id) => (
        <div
          className="comment"
          key={id} //api 문서대로 id, createAt, account 추가해야함
        >
          {/* 댓글 작성자 */}
          <CommentInfo>
            <div className="commentAuthor">
              <FontAwesomeIcon icon={faUser} />
              {comment.nickname}
            </div>
            <div className="commentBtnArea">
              {/* 댓글 삭제 */}
              <div
                onClick={() => {
                  onRemoveComment(id);
                }}
              >
                삭제
              </div>

              {/* 댓글 수정 */}
              <div
                onClick={() => {
                  onEditComment(id, comment.content);
                }}
              >
                수정
              </div>
            </div>
          </CommentInfo>

          {/* 댓글 내용 */}
          {commentEdit.id !== id ? (
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
    </CommentWrap>
  );
};

export default Comment;
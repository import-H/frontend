// react
import React from "react";

// style
import styled from "styled-components";

// components
import CommentWriteBtn from "./post/CommentWriteBtn.js";
import CommentInfo from "./post/CommentInfo.js";
import CommentContent from "./post/CommentContent.js";
import CommentCreatedAt from "./post/CommentCreatedAt.js";

const CommentsWrap = styled.div`
  border-top: 1px solid #ddd;
  padding: 20px 0;
  & h3 {
    font-size: 1.8em;
    margin-bottom: 15px;
    @media (max-width: 768px) {
      font-size: 1.6em;
    }
    & span {
      color: var(--point-color-orange);
    }
  }
`;

const CommentWrap = styled.div`
  font-size: 1.5em;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 7px;
  margin-bottom: 10px;

  & .commentCreateAt {
    color: #a5a7a9;
    font-size: 1.3rem;
    margin: 1rem;
    margin-bottom: 0;
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

const Comment = ({
  comments,
  isAuth,
  onPostComment,
  onEditComment,
  onChangeComment,
  onRemoveComment,
  userNickname,
  commentData,
  commentEdit,
  onChangeEditComment,
}) => {
  return (
    <CommentsWrap>
      <h3 title="comment">
        <span>{comments.length}</span> Comment
      </h3>
      {comments.map(comment => (
        <CommentWrap key={comment.id}>
          {/* 댓글 작성자 */}
          <CommentInfo
            nickname={comment.nickname}
            userNickname={userNickname}
            id={comment.id}
            content={comment.content}
          />

          {/* 댓글 내용 */}
          <CommentContent
            id={comment.id}
            editId={commentEdit.id}
            content={comment.content}
            editContent={commentEdit.content}
            onChangeEditComment={onChangeEditComment}
            onRemoveComment={onRemoveComment}
            onEditComment={onEditComment}
          />

          {/* 댓글 생성일 */}
          <CommentCreatedAt createdAt={comment.createdAt} />
        </CommentWrap>
      ))}
      {isAuth ? (
        <CommentWriteBtn
          onChangeComment={onChangeComment}
          commentData={commentData}
          onPostComment={onPostComment}
        />
      ) : (
        <></>
      )}
    </CommentsWrap>
  );
};

export default Comment;

import React from "react";

// style
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }

  & .commentWrite {
    flex: 15;
    font-family: "Noto Sans KR", sans-serif;
    resize: none;
    height: 5rem;
    padding: 10px 15px;
    margin: 2px;
    border: 1px solid #ccc;
    font-size: 1.4rem;
    border-radius: 4px;
    outline: none;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .linkBtn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
    height: 4.3rem;
    cursor: pointer;
    word-break: keep-all;
    @media (max-width: 768px) {
      width: 100%;
      align-self: flex-end;
      margin-top: 2rem;
    }
  }
`;

const CommentWriteBtn = ({ onChangeComment, commentData, onPostComment }) => {
  return (
    <Wrapper>
      <textarea
        className="commentWrite"
        placeholder="댓글을 작성하세요"
        onChange={onChangeComment}
        value={commentData}
      />

      <div className="linkBtn black" onClick={onPostComment}>
        댓글 작성
      </div>
    </Wrapper>
  );
};

export default CommentWriteBtn;

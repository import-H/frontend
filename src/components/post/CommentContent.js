import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  & .commentContent {
    margin: 1rem;
    margin-top: 0.2rem;
    color: #333;
    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
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
`;

const CommentContent = ({
  id,
  editId,
  content,
  editContent,
  onChangeEditComment,
}) => {
  return (
    <Wrapper>
      {editId !== id ? (
        <div className="commentContent">{content}</div>
      ) : (
        <textarea
          className="commentEdit"
          value={editContent}
          onChange={onChangeEditComment}
        />
      )}
    </Wrapper>
  );
};

export default CommentContent;

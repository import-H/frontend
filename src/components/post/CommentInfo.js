import React from "react";

// style
import styled from "styled-components";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
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
      @media (max-width: 768px) {
        font-size: 0.8em;
      }

      &:hover {
        color: var(--point-color-orange);
      }
    }
  }
`;

const CommentInfo = ({
  nickname,
  userNickname,
  id,
  content,
  onRemoveComment,
  onEditComment,
}) => {
  return (
    <Wrapper>
      <div className="commentAuthor">
        <FontAwesomeIcon icon={faUser} />
        {nickname}
      </div>
      {nickname === userNickname && (
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
              onEditComment(id, content);
            }}
          >
            수정
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default CommentInfo;

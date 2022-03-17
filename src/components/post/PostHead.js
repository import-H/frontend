import React from "react";

// style
import styled from "styled-components";

// etc
import { timeElapsed } from "../../utils/tools";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faClock } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
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

const PostHead = ({ title, viewCount, createdAt, tags }) => {
  return (
    <Wrapper>
      <div className="postInfo flex flex-jc-b flex-ai-c">
        {/* 게시물 제목 */}
        <div className="postTitle">{title}</div>
        <div className="infoWrap">
          {/* 조회수 */}
          <span>
            <FontAwesomeIcon icon={faEye} />
            {viewCount}
          </span>
          {/* 글 등록 시각 */}
          <span>
            <FontAwesomeIcon icon={faClock} />
            {timeElapsed(createdAt)}
          </span>
        </div>
      </div>

      {/* 태그 */}
      <div className="postTag">
        {tags.map(tag => (
          <span key={tag.name}>{tag.name}</span>
        ))}
      </div>
    </Wrapper>
  );
};

export default PostHead;

import React from "react";

// style
import styled from "styled-components";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
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

const PostSidebar = ({ scrap, like, likeCount, onClickLike, onClickScrap }) => {
  return (
    <Wrapper>
      {/* 좋아요 */}
      <LikeWrap Liked={like} onClick={onClickLike}>
        <FontAwesomeIcon icon={faHeart} />
        <span className="num"> {likeCount}</span>
      </LikeWrap>
      <div>
        <button onClick={onClickScrap}>스크랩</button>
        <div>{scrap ? "true" : "false"}</div>
      </div>
    </Wrapper>
  );
};

export default PostSidebar;

import React from "react";

// etc
import { Viewer } from "@toast-ui/react-editor";
import { timeElapsed } from "../../utils/tools";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentAlt } from "@fortawesome/free-solid-svg-icons";

// style
import styled from "styled-components";

const ContentArea = styled.div`
  flex: 3;
`;

const BoardTitle = styled.div`
  font-size: 2.2em;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  transition: all 0.3s;

  & .date {
    display: block;
    font-size: 0.6em;
    color: #666;
  }
`;

const PostSummary = ({ post, simplyContent }) => {
  return (
    <ContentArea>
      <BoardTitle className="boardTitle">
        {post.responseInfo.title}
        {/* 제목 */}
        <span className="date">{timeElapsed(post.responseInfo.createdAt)}</span>
        {/* 생성 시간 */}
      </BoardTitle>
      {/* 글쓴이 */}
      <div className="boardAuthor">{post.responseInfo.author}</div>
      <Viewer initialValue={simplyContent(post.responseInfo.content)} />
      <div className="commentWrap flex flex-ai-c">
        {/* 좋아요 */}
        <div className="boardLike">
          <FontAwesomeIcon icon={faHeart} />
          {post.responseInfo.likeCount}
        </div>
        {/* 댓글 */}
        <div className="boardComment">
          <FontAwesomeIcon icon={faCommentAlt} />
          {post.commentsCount}
        </div>
      </div>
    </ContentArea>
  );
};

export default PostSummary;

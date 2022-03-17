import React from "react";

//react-router-dom
import { Link } from "react-router-dom";

// config
import { API_URL } from "../../config";

// components
import PostSummary from "./PostSummary";
import PostThumbnail from "./PostThumbnail";
import PostWriteBtn from "./PostWriteBtn";

// style
import styled from "styled-components";

const BoardWrap = styled.div`
  width: 80%;
  padding: 20px 0;

  & .writeBtn {
    display: inline-block;
    margin-bottom: 20px;

    &:last-of-type {
      margin-top: 20px;
    }
  }
`;

const BoardList = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
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

  &:hover .boardTitle {
    color: var(--point-color-orange);
  }
`;

const BoardForm = ({ posts, boardId, isAuth, simplyContent }) => {
  return (
    <BoardWrap>
      <div>
        {posts &&
          posts.map(post => (
            <Link
              to={{
                pathname: `/board/${boardId}/${post.responseInfo.postId}`,
              }}
              key={post.responseInfo.postId}
            >
              <BoardList>
                {post.thumbnail && <PostThumbnail post={post} />}
                <PostSummary post={post} simplyContent={simplyContent} />
              </BoardList>
            </Link>
          ))}
      </div>
      <div className="flex flex-jc-e">
        {isAuth && <PostWriteBtn boardId={boardId} />}
      </div>
    </BoardWrap>
  );
};

export default BoardForm;

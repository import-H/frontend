import React from "react";

// style
import styled from "styled-components";

// components
import CommentC from "../../containters/post/CommentC";
import PostHead from "./PostHead";
import PostAuthorInfo from "./PostAuthorInfo";
import PostSidebar from "./PostSidebar";
import PostChangeBtn from "./PostChangeBtn";
import PostContent from "./PostContent";

const PostView = styled.div`
  width: 80%;
  margin: 0 auto;
  position: relative;

  @media (max-width: 1200px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }

  /* 하단 수정 버튼 */
  & .btnWrap {
    margin-top: 34px;
    & .linkBtn {
      display: inline-block;
      margin-right: 10px;
      cursor: pointer;
      word-break: keep-all;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

const PostTemplate = ({
  isAuth,
  post,
  profile,
  onDeletePost,
  onClickLike,
  postId,
  boardId,
}) => {
  return (
    <>
      {post?.responseInfo?.postId === Number(postId) && (
        <PostView>
          {/* 게시글 Head */}
          <PostHead
            title={post.responseInfo.title}
            viewCount={post.responseInfo.viewCount}
            createdAt={post.responseInfo.createdAt}
            tags={post.responseInfo.tags}
          />
          {/* 게시물 본문 */}
          <PostContent content={post.responseInfo.content} />

          {/* 작성자 정보 */}
          <PostAuthorInfo
            nickname={post.responseInfo.nickname}
            profileImage={profile?.profileImage}
          />
          {/* 댓글 */}
          {post.comments && (
            <CommentC comments={post.comments} postId={postId} />
          )}
          {/* 사이드바 */}
          <PostSidebar
            like={post.like}
            likeCount={post.responseInfo.likeCount}
            onClickLike={onClickLike}
          />
          {/* 수정, 삭제버튼 */}
          {isAuth && (
            <PostChangeBtn
              boardId={boardId}
              postId={postId}
              onDeletePost={onDeletePost}
            />
          )}
        </PostView>
      )}
    </>
  );
};

export default PostTemplate;

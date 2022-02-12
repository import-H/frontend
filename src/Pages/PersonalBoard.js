// react
import React, { useEffect, useState } from "react";

// toast-ui viewer
import { Viewer } from "@toast-ui/react-editor";

// style
import GlobalStyle from "../Styles/Globalstyle.js";
import { Container } from "../Styles/theme";
import styled from "styled-components";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentAlt } from "@fortawesome/free-solid-svg-icons";

// sample Posts Data
const samplePosts = [
  {
    id: 1,
    title: "title",
    content: "content",
    thumbnail: "",
    create_at: "2022-01-21",
    author: "자몽",
    view: 3,
    like: 2,
    comments: [],
  },
  {
    id: 2,
    title: "프로그래밍 스터디 이름",
    content: "프로그래밍 스터디 이름은 `import_H`입니다.!!",
    thumbnail: "",
    create_at: "2022-01-21",
    author: "자몽",
    view: 3,
    like: 2,
    comments: ["123123", "123123"],
  },
];

// style
const BoardWrap = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const BoardList = styled.div`
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
`;
const BoardTitle = styled.div`
  font-size: 2.2em;
  font-weight: 500;
  display: flex;
  justify-content: space-between;

  & .date {
    display: block;
    font-size: 0.6em;
    color: #666;
  }
`;

const CommentWrite = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  & .postWrite {
    flex: 15;
    font-family: "Noto Sans KR", sans-serif;
    resize: none;
    heigth: 5rem;
    padding: 10px 15px;
    margin: 2px;
    border: 1px solid #ccc;
    font-size: 1.4rem;
    border-radius: 4px;
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

const PersonalBoard = () => {
  const [showDetailPost, setShowDetailPost] = useState();

  const onDetailPost = postId => {
    if (postId === showDetailPost) {
      setShowDetailPost("");
    } else {
      setShowDetailPost(postId);
    }
  };

  return (
    <Container>
      <GlobalStyle />
      <BoardWrap>
        {samplePosts.map(post => (
          <div key={post.id}>
            <BoardList
              onClick={() => {
                onDetailPost(post.id);
              }}
            >
              <BoardTitle>
                {post.title}
                {/* 제목 */}
                <span className="date">{post.create_at}</span>
                {/* 생성 시간 */}
              </BoardTitle>
              {/* 글쓴이 */}
              <div className="boardAuthor">{post.author}</div>
              <Viewer initialValue={post.content} />
              <div className="commentWrap flex flex-ai-c">
                {/* 좋아요 */}
                <div className="boardLike">
                  <FontAwesomeIcon icon={faHeart} />
                  {post.like}
                </div>
                {/* 코멘트 */}
                <div className="boardComment">
                  <FontAwesomeIcon icon={faCommentAlt} /> {post.comments.length}
                </div>
              </div>
            </BoardList>
            {showDetailPost === post.id && (
              <Comment post={post} postId={post.id} />
            )}
          </div>
        ))}
      </BoardWrap>
    </Container>
  );
};

export default PersonalBoard;
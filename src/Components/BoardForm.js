import React, { useEffect, useState } from "react";
// api가 아직 정해지지 않아 임시로 samplePosts 만들어둠

import GlobalStyle from "../Styles/Globalstyle.js";
import { Container } from "../Styles/theme";
import { Viewer } from "@toast-ui/react-editor";
import styled from "styled-components";

import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const BoardWrap = styled.div`
  width: 80%;
  padding: 20px 0;

  & .writeBtn{
    display: inline-block;
    margin-bottom: 20px;

    &:last-of-type{
      margin-top: 20px;
    }

  }

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

  &:hover .boardTitle{
    color: #FF6C26;
  }
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

const BoardForm = () => {
  const dispatch = useDispatch();
  const boardId = useParams().id;

  const [samplePosts, setSamplePosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/posts')
      .then(res => {
        setSamplePosts(res.data);
      })
  }, [])

  return (
    <>
      <GlobalStyle />
      <BoardWrap> 
      {/* <div className="flex flex-jc-e">
        <Link to={{ pathname: `/write/${boardId}` }} className="writeBtn linkBtn">글 작성하기</Link> 
        </div>    */}
        <div>
          {samplePosts.map(post => (
            <Link
              to={{ pathname: `/board/${boardId}/${post.id}` }}
              key={post.id}
            >
              <BoardList>
                
                <BoardTitle className="boardTitle">
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
                    <FontAwesomeIcon icon={faCommentAlt} />{" "}
                    {post.comments.length}
                  </div>
                </div>
              </BoardList>
            </Link>
          ))}
        </div>
        <div className="flex flex-jc-e">
        <Link to={{ pathname: `/write/${boardId}` }} className="writeBtn linkBtn black">글 작성하기</Link> 
        </div>
      </BoardWrap>
    </>
  );
};

export default BoardForm;

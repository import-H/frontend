import React from "react";
import styled from "styled-components";

import PostTitleInput from "./PostTitleInput";
import PostTagsArea from "./PostTagsArea";
import PostContentInput from "./PostContentInput";
import PostSubmitBtn from "./PostSubmitBtn";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "../../styles/theme";

const WriteContainer = styled(Container)`
  padding-top: 50px;

  @media (max-width: 1200px) {
    width: 100%;
    padding: 50px 0;
  }

  & .tagCon {
    margin: 10px 0;
    margin-top: 25px;
    & .tagArea {
      margin: 10px 0;
      font-size: 1.2em;
      flex-wrap: wrap;

      & .postTag {
        padding: 5px 7px;
        margin-bottom: 7px;
        margin-right: 15px;
        border-radius: 5px;
        background: #ddd;
        color: #666;
        font-size: 1.1em;
      }
    }
  }

  & .toastui-editor-defaultUI {
    margin: 12px 0;
  }

  & .linkBtn {
    padding: 7px 30px;
    font-size: 1.2em;
    margin-left: auto;
    margin-right: 0;
    margin-top: 30px;

    @media (max-width: 768px) {
      margin-right: auto;
    }
  }
`;

const PersonalPostWrite = ({
  onPostSubmit,
  tags,
  onTagDelete,
  onTagPush,
  currentTag,
  onTitleChange,
  editorRef,
  onCurTagChange,
}) => {
  const personId = useParams().personId;
  const userPathId = useSelector(state => state?.user?.profile?.pathId);
  return (
    <>
      {userPathId === personId && (
        <WriteContainer>
          {/* 글 제목 */}
          <PostTitleInput onTitleChange={onTitleChange} />
          {/* 태그 */}
          <PostTagsArea
            onCurTagChange={onCurTagChange}
            currentTag={currentTag}
            onTagPush={onTagPush}
            onTagDelete={onTagDelete}
            tags={tags}
          />
          {/* 내용 */}
          <PostContentInput editorRef={editorRef} size="half" />
          {/* post 제출 */}
          <PostSubmitBtn onPostSubmit={onPostSubmit} />
        </WriteContainer>
      )}
    </>
  );
};

export default PersonalPostWrite;

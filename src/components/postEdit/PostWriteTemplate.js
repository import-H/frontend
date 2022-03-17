import React from "react";

// style
import { StyledConEditor } from "../../styles/theme";
import PostContentInput from "./PostContentInput";

// components
import PostSubmitBtn from "./PostSubmitBtn";
import PostTagsArea from "./PostTagsArea";
import PostTitleInput from "./PostTitleInput";

const PostWriteTemplate = ({
  children,
  onPostSubmit,
  onTitleChange,
  editorRef,
  shape,
}) => {
  return (
    <StyledConEditor>
      {/* 글 제목 */}
      <PostTitleInput onTitleChange={onTitleChange} />
      {/* 내용 */}
      <PostContentInput editorRef={editorRef} shape={shape} />

      {/* 태그 */}
      {children}
      {/* post 제출 */}
      <div className="submitArea flex flex-jc-e">
        <PostSubmitBtn onPostSubmit={onPostSubmit} />
      </div>
    </StyledConEditor>
  );
};

export default PostWriteTemplate;

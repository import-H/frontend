// react
import React, { useEffect, useState, useRef } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../redux/slices/postSlice";

// styled-components
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { StyledFormEditor } from "../styles/theme";

import { Editor } from "@toast-ui/react-editor";

// auth form으로 변경해도 좋을듯(공통 기능 많아서)
const PostForm = () => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const [showError, setShowError] = useState("");

  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const postSubmit = e => {
    e.preventDefault();

    const instance = editorRef.current.getInstance();
    setPost({ ...post, content: instance.getMarkdown() });
    addPost(...post);
  };

  return (
    <div>
      <StyledFormEditor onSubmit={postSubmit}>
        <label>title</label>
        <input
          type="text"
          name="email"
          onChange={e => setPost({ ...post, title: e.target.value })}
        />
        <label>content</label>
        <Editor
          initialValue="hello react editor world!"
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
          ref={editorRef}
        />
        <button type="submit">작성 완료</button>
      </StyledFormEditor>
    </div>
  );
};

export default PostForm;

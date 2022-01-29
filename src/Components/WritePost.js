// react
import React, { useState, useRef } from "react";

// redux
import { addPost } from "../reducers/slices/postSlice";

// styled-components
// import styled from 'styled-components';
import GlobalStyle from "../Styles/Globalstyle.js";
import { Container } from "../Styles/theme";

// toast-ui editor
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useDispatch } from "react-redux";

// auth form으로 변경해도 좋을듯(공통 기능 많아서)
const WritePost = () => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  const [post, setPost] = useState({
    title: "",
    tags: ["aa", "bb"],
    content: "",
    author: "자몽",
    view: 3,
    like: 2,
    comments: [],
  });

  const postSubmit = e => {
    e.preventDefault();

    const instance = editorRef.current.getInstance();
    setPost({ ...post, content: instance.getMarkdown() });
    dispatch(addPost(post));
  };

  return (
    <Container>
      <GlobalStyle />
      <form
        onSubmit={postSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          margin: "3rem",
        }}
      >
        <label>title</label>
        <input
          type="text"
          name="email"
          onChange={e => setPost({ ...post, title: e.target.value })}
        />
        <label>tags</label>
        <input />
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
      </form>
    </Container>
  );
};

export default WritePost;

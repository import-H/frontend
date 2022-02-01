// react
import React, { useState, useRef, useEffect } from "react";

// redux
import { addPost, getPost } from "../reducers/slices/postSlice";

// styled-components
// import styled from 'styled-components';
import GlobalStyle from "../Styles/Globalstyle.js";
import { Container } from "../Styles/theme";

// toast-ui editor
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useDispatch, useSelector } from "react-redux";

// react-router-dom
import { useParams, useNavigate } from "react-router-dom";

// auth form으로 변경해도 좋을듯(공통 기능 많아서)
const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postData = useSelector(state => state.post.post);
  const [nav, setNav] = useState(false);
  const editorRef = useRef(null);

  const boardId = useParams().id;

  const [post, setPost] = useState({
    title: "",
    tags: ["aa", "bb"],
    content: "",
  });

  const editPost = async e => {
    e.preventDefault();

    const instance = editorRef.current.getInstance();
    await setPost({ ...post });
    const postData = {
      ...post,
      content: instance.getMarkdown(), //setPost에서 content 수정하면 바로 반영안되는 문제로 이렇게 해결함
    };
    await dispatch(addPost({ boardId, postData }));
  };

  useEffect(() => {
    if (addPostStatus === "loading") {
      setNav(true);
    }
    if (addPostStatus === "failed") {
      setNav(false);
    }
    if (nav && addPostStatus === "success") {
      navigate(-1);
    }
  }, [addPostStatus, navigate]);

  useEffect(() => {
    dispatch(getPost());
  }, []);

  return (
    <Container>
      <GlobalStyle />
      <form
        onSubmit={editPost}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          margin: "3rem",
        }}
      >
        <label>title</label>
        <input
          initialValue={postData?.title}
          type="text"
          name="email"
          onChange={e => setPost({ ...post, title: e.target.value })}
        />
        <label>tags</label>
        <input initialValue={postData?.tags} />
        <label>content</label>
        <Editor
          initialValue={postData?.content}
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

export default EditPost;

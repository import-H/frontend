// react
import React, { useState, useRef, useEffect } from "react";

// redux
import { addPost } from "../reducers/slices/postSlice";

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
const WritePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addPostStatus = useSelector(state => state.post.status);
  const [nav, setNav] = useState(false);
  const editorRef = useRef(null);

  const boardId = useParams().id;

  const [post, setPost] = useState({
    title: "",
    tags: ["aa", "bb"],
    content: "",
  });

  const postSubmit = async e => {
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
    if (editorRef.current) {
      // 기존에 Image 를 Import 하는 Hook 을 제거한다.
      editorRef.current.getInstance().removeHook("addImageBlobHook");

      // 새롭게 Image 를 Import 하는 Hook 을 생성한다.
      editorRef.current
        .getInstance()
        .addHook("addImageBlobHook", (blob, callback) => {
          (async () => {
            let formData = new FormData();
            formData.append("file", blob);

            console.log("이미지가 업로드 됐습니다.");

            const imageUrl = "http://localhost:8080/file/upload/";

            // Image 를 가져올 수 있는 URL 을 callback 메서드에 넣어주면 자동으로 이미지를 가져온다.
            callback(imageUrl, "iamge");
          })();

          return false;
        });
    }

    return () => {};
  }, [editorRef]);

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
          height="800px"
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

// react
import React, { useState, useRef, useEffect } from "react";

// redux
import { editPost, getPost } from "../reducers/slices/postSlice";
import axiosInstance from "../utils/axiosInstance";
// styled-components
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

  const { post, editStatus } = useSelector(state => state.post);

  const addPostStatus = useSelector(state => state.post.status);
  const editorRef = useRef(null);

  const [title, setTitle] = useState(post?.responseInfo.title);
  console.log(post);
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState(
    post?.responseInfo.tags.map(tag => tag.name),
  );

  const boardId = useParams().boardId;
  const postId = useParams().postId;

  const postSubmit = async e => {
    e.preventDefault();

    const instance = editorRef.current.getInstance();
    const postData = {
      title: title,
      tags: tags,
      content: instance.getMarkdown(), //setPost에서 content 수정하면 바로 반영안되는 문제로 이렇게 해결함
    };
    await dispatch(editPost({ boardId, postId, postData }));
  };

  const onTagPush = () => {
    if (!tags.includes(currentTag)) setTags([...tags, currentTag]);
    setCurrentTag("");
  };

  useEffect(() => {
    if (editorRef.current) {
      // 기존에 Image 를 Import 하는 Hook 을 제거한다.
      editorRef.current.getInstance().removeHook("addImageBlobHook");

      // 새롭게 Image 를 Import 하는 Hook 을 생성한다.
      editorRef.current
        .getInstance()
        .addHook("addImageBlobHook", (blob, callback) => {
          (async function () {
            let formData = new FormData();
            formData.append("image", blob);

            const response = await axiosInstance.post(
              `http://localhost:8090/v1/file/upload`,
              formData,
              { header: { "content-type": "multipart/formdata" } },
            );

            const url = `http://localhost:8090${response.data.data.imageURL}`;

            callback(url, "Image");
          })();

          return false;
        });
    }

    return () => {};
  }, [editorRef]);

  useEffect(() => {
    dispatch(getPost({ boardId, postId }));
  }, []);

  useEffect(() => {
    if (editStatus === "success") {
      navigate(-1);
    }
  }, [editStatus]);

  return (
    <Container>
      <GlobalStyle />
      <div
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
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
        <label>tags</label>
        {/* tagArea/ */}
        <div>
          {tags.map((tag, id) => (
            <div
              onClick={() => {
                setTags(tags.filter(t => t !== tag));
              }}
            >
              {tag}
            </div>
          ))}
          <input
            onChange={e => setCurrentTag(e.target.value)}
            value={currentTag}
            onKeyPress={e => {
              if (e.key === "Enter") {
                onTagPush();
              }
            }}
          />
        </div>
        <label>content</label>
        <Editor
          initialValue={post?.responseInfo.content}
          previewStyle="vertical"
          height="800px"
          initialEditType="markdown"
          useCommandShortcut={true}
          ref={editorRef}
        />
        <button onClick={postSubmit}>작성 완료</button>
      </div>
    </Container>
  );
};

export default EditPost;

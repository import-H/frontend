// react
import React, { useState, useRef, useEffect } from "react";

// redux
import { addPost } from "../reducers/slices/postSlice";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";

// styled-components
import styled from "styled-components";
import GlobalStyle from "../Styles/Globalstyle.js";
import { Container, Input, StyledConEditor } from "../Styles/theme";

// toast-ui editor
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

// react-router-dom
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { API_URL } from "../config";

// style
const WriteContainer = styled(Container)`
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

  & .submitArea{
    @media(max-width: 768px){
      justify-content: center;
    }
  }

  & .linkBtn {
    padding: 7px 30px;
    font-size: 1.2em;
  }
`;

const TagsInput = styled(Input)`
  width: 100%;
  flex-shrink: 0;
`;

const WritePost = () => {
  // config
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boardId = useParams().boardId;

  // inputs
  const editorRef = useRef(null);

  const [title, setTitle] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState([]);

  // 태그 입력
  const onTagPush = () => {
    if (!tags.includes(currentTag)) setTags([...tags, currentTag]);
    setCurrentTag("");
  };

  // post 제출
  const postSubmit = async e => {
    e.preventDefault();

    const instance = editorRef.current.getInstance().getMarkdown();
    const findImage = /!\[Image\]\([A-Za-z0-9\/:\-.]+\)/gi;

    let imgUrls =
      instance.match(findImage) &&
      instance.match(findImage).map(url => url.split("/").pop());
    imgUrls = imgUrls
      ? imgUrls.map(imgUrl => imgUrl.substring(0, imgUrl.length - 1))
      : [];

    const postData = {
      title: title,
      tags: tags,
      content: instance,
      images: imgUrls,
      type: boardId,
    };

    try {
      await dispatch(addPost(postData));
      navigate("/");
    } catch (e) {
      alert(e.msg);
    }
  };

  // addImageBlobHook
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().removeHook("addImageBlobHook");
      editorRef.current
        .getInstance()
        .addHook("addImageBlobHook", (blob, callback) => {
          (async function () {
            let formData = new FormData();
            formData.append("image", blob);

            const response = await axiosInstance.post(
              `${API_URL}/v1/file/upload`,
              formData,
              { header: { "content-type": "multipart/formdata" } },
            );

            const url = `${API_URL}${response.data.data.imageURL}`;
            callback(url, "Image");
          })();
          return false;
        });
    }
    return () => {};
  }, [editorRef]);

  return (
    <WriteContainer>
      <GlobalStyle />
      <StyledConEditor
      >
        {/* 글 제목 */}
        <Input
          type="text"
          name="email"
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />
        {/* 내용 */}
        <Editor
          initialValue="hello react editor world!"
          previewStyle="vertical"
          height="800px"
          initialEditType="markdown"
          useCommandShortcut={true}
          ref={editorRef}
        />
        {/* 태그 제출 */}
        <div className="tagCon">
          <TagsInput
            className="tagsInput"
            placeholder="Tags"
            onChange={e => setCurrentTag(e.target.value)}
            value={currentTag}
            onKeyPress={e => {
              if (e.key === "Enter") {
                onTagPush();
              }
            }}
          />
          {/* 태그 목록 */}
          <div className="tagArea flex flex-ai-c">
            {tags.map((tag, id) => (
              <div
                key={tag}
                className="postTag"
                onClick={() => {
                  setTags(tags.filter(t => t !== tag));
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        {/* post 제출 */}
        <div className="submitArea flex flex-jc-e">
          <button className="linkBtn black" onClick={postSubmit}>
            작성 완료
          </button>
        </div>
      </StyledConEditor>
    </WriteContainer>
  );
};

export default WritePost;

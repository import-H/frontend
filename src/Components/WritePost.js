// react
import React, { useState, useRef, useEffect } from "react";

// redux
import { addPost, uploadFile } from "../reducers/slices/postSlice";
import axiosInstance from "../utils/axiosInstance";
// styled-components
import styled from 'styled-components';
import GlobalStyle from "../Styles/Globalstyle.js";
import { Container, Input } from "../Styles/theme";

// toast-ui editor
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useDispatch, useSelector } from "react-redux";

// react-router-dom
import { useParams, useNavigate } from "react-router-dom";

// style
const WriteContainer = styled(Container)`

  & .tagCon{
    margin: 10px 0;
    margin-top: 25px;
    & .tagArea{    
     margin: 10px 0;
     font-size: 1.2em;
     flex-wrap: wrap;

     & .postTag{
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
  
   & .toastui-editor-defaultUI{
     margin: 12px 0;
   }

   & .linkBtn{
     padding: 7px 30px;
     font-size: 1.2em;
   }
`;

const TagsInput = styled(Input)`
  width: 100%;
  flex-shrink: 0;
`;

const WritePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addPostStatus = useSelector(state => state.post.addPost);

  const file = useSelector(state => state.post?.file);

  const [nav, setNav] = useState(false);
  const editorRef = useRef(null);

  const boardId = useParams().id;

  const [title, setTitle] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState([]);

  const postSubmit = async e => {
    e.preventDefault();

    const instance = editorRef.current.getInstance();
    const postData = {
      title: title,
      tags: tags,
      content: instance.getMarkdown(), //setPost에서 content 수정하면 바로 반영안되는 문제로 이렇게 해결함
    };
    await dispatch(addPost({ boardId, postData }));
  };

  const onTagPush = () => {
    if (!tags.includes(currentTag)) setTags([...tags, currentTag]);
    setCurrentTag("");
  };

  useEffect(() => {
    if (addPostStatus === "success") {
      navigate(-1);
    }
  }, [addPostStatus]);

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

            console.log(url);
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          margin: "3rem",
        }}
      >
        {/* 글 제목 */}
        <Input
          type="text"
          name="email"
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"/>      
        {/* content */}
        <Editor
          initialValue="hello react editor world!"
          previewStyle="vertical"
          height="800px"
          initialEditType="markdown"
          useCommandShortcut={true}
          ref={editorRef}
        />
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
          {/* tagArea/ */}
        <div className="tagArea flex flex-ai-c">
          {tags.map((tag, id) => (
            <div className="postTag"
              onClick={() => {
                setTags(tags.filter(t => t !== tag));
              }}
            >
              {tag}
            </div>
          ))}
          </div>           
        </div>
        <div className="submitArea flex flex-jc-e">
          <button className="linkBtn black" onClick={postSubmit}>작성 완료</button>
        </div>        
      </div>
    </WriteContainer>
  );
};

export default WritePost;

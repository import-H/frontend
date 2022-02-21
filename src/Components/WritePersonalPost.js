import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import axiosInstance from "../utils/axiosInstance";
import styled from "styled-components";
import { Container, Input } from "../Styles/theme";
import { useDispatch } from "react-redux";
import { addPost, getPost, getPosts } from "../reducers/slices/postSlice";

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

  & .linkBtn {
    padding: 7px 30px;
    font-size: 1.2em;
  }
`;
const TagsInput = styled(Input)`
  width: 100%;
  flex-shrink: 0;
`;

const WritePersonalPost = ({ personId }) => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState([]);

  const postSubmit = async () => {
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
      type: personId,
    };
    await dispatch(addPost(postData));
    await dispatch(getPosts(personId));

    setTitle("");
    setTags([]);
    editorRef.current.getInstance().reset();
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
      <Input
        type="text"
        name="title"
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        value={title}
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
            <div
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
      <Editor
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height={"400px"}
        initialEditType="markdown"
        useCommandShortcut={true}
        previewStyle="tab"
        ref={editorRef}
      />
      <button className="linkBtn black" onClick={postSubmit}>
        작성 완료
      </button>
    </WriteContainer>
  );
};

export default WritePersonalPost;

import React, { useState, useEffect, useRef } from "react";
import PostWriteTemplate from "../../components/postEdit/PostWriteTemplate";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_URL } from "../../config";
import { addPost, getPosts } from "../../redux/slices/postSlice";
import PersonalPostWrite from "../../components/postEdit/PersonalPostWrite";
import PostTagsArea from "../../components/postEdit/PostTagsArea";
import useEditorRef from "../../hooks/useEditorRef";

const PostWriteC = ({ shape, id }) => {
  // config
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // inputs
  const editorRef = useEditorRef();

  const [title, setTitle] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState([]);

  const onTagDelete = (tags, tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  const onCurTagChange = e => {
    setCurrentTag(e.target.value);
  };

  const onTitleChange = e => {
    setTitle(e.target.value);
  };

  // 태그 입력
  const onTagPush = () => {
    if (!tags.includes(currentTag)) setTags([...tags, currentTag]);
    setCurrentTag("");
  };

  // post 제출
  const onPostSubmit = async e => {
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
      type: id,
      important: false,
    };

    try {
      if (id === "notice")
        await dispatch(addPost({ ...postData, important: true })).unwrap();
      else await dispatch(addPost(postData)).unwrap();
      switch (id) {
        case "free":
        case "notice":
        case "questions":
          navigate("/");
          break;
        default:
          await dispatch(getPosts(id));
          break;
      }
    } catch (e) {
      console.log(e);
      alert(e.msg);
    }
  };
  // console.log(title, tags, editorRef?.current?.getInstance()?.getMarkdown());

  return (
    <>
      <PostWriteTemplate
        onPostSubmit={onPostSubmit}
        onTitleChange={onTitleChange}
        title={title}
        navigate={navigate}
        editorRef={editorRef}
        shape={shape}
      >
        <PostTagsArea
          onCurTagChange={onCurTagChange}
          currentTag={currentTag}
          onTagPush={onTagPush}
          onTagDelete={onTagDelete}
          tags={tags}
        />
      </PostWriteTemplate>
    </>
  );
};

export default PostWriteC;

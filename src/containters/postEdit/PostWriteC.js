import React, { useState, useEffect, useRef } from "react";
import PostWriteTemplate from "../../components/postEdit/PostWriteTemplate";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_URL } from "../../config";
import { addPost, getPosts } from "../../redux/slices/postSlice";
import PersonalPostWrite from "../../components/postEdit/PersonalPostWrite";
import PostTagsArea from "../../components/postEdit/PostTagsArea";

const PostWriteC = ({ shape, id }) => {
  // config
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // inputs
  const editorRef = useRef(null);

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
      await dispatch(addPost(postData));
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
      alert(e.msg);
    }
  };
  console.log(title, tags, editorRef?.current?.getInstance()?.getMarkdown());

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

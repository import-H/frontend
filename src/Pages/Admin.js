import React, { useState } from "react";
import GlobalStyle from "../Styles/Globalstyle";
import { Container } from "../Styles/theme";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addBanner } from "../reducers/slices/adminSlice";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const Admin = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.admin.status);

  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const [currentTag, setCurrentTag] = useState("");

  const onTagPush = () => {
    if (!tags.includes(currentTag)) setTags([...tags, currentTag]);
    setCurrentTag("");
  };

  console.log(title, tags, content, url, imgUrl);

  const bannerSubmit = async e => {
    e.preventDefault();

    const data = {
      title: title,
      url: url,
      imgUrl: imgUrl,
      content: content,
      tags: tags,
    };

    dispatch(addBanner(data));
  };

  const onImageChage = async e => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("image", img);

    const response = await axiosInstance.post(
      `http://localhost:8090/v1/file/upload`,
      formData,
      { header: { "content-type": "multipart/formdata" } },
    );

    const url = `http://localhost:8090${response.data.data.imageURL}`;
    setImgUrl(url);
  };

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
          name="title"
          onChange={e => setTitle(e.target.value)}
        />
        <label>image</label>
        <div>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg,image/gif"
            name="profile_img"
            onChange={onImageChage}
          ></input>
        </div>
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
        <input
          type="text"
          name="content"
          onChange={e => setContent(e.target.value)}
        />
        <label>URL</label>
        <input type="text" name="url" onChange={e => setUrl(e.target.value)} />
      </div>
      <button onClick={bannerSubmit}>제출</button>
    </Container>
  );
};

export default Admin;

import React, { useEffect } from "react";
import GlobalStyle from "../Styles/Globalstyle.js";
import { Container } from "../Styles/theme";
import { Viewer } from "@toast-ui/react-editor";
import styled from "styled-components";

const samplePost = {
  id: 1,
  title: "title",
  content: "content",
  thumbnail: "",
  create_at: "2022-01-21",
  author: "자몽",
  view: 3,
  like: 2,
  comments: [],
};
const Post = () => {
  return (
    <Container>
      <GlobalStyle />
      <div>hi</div>
    </Container>
  );
};

export default Post;

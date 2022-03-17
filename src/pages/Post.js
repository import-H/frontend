// react
import React from "react";
import PostC from "../containters/post/PostC.js";

// style
import GlobalStyle from "../styles/Globalstyle.js";
import { Container } from "../styles/theme";

// main
const Post = () => {
  return (
    <Container>
      <GlobalStyle />
      <PostC />
    </Container>
  );
};

export default Post;

// react
import React from "react";

// styled-components
import styled from "styled-components";
import GlobalStyle from "../styles/Globalstyle.js";
import { Container } from "../styles/theme";

// components
import PostWriteC from "../containters/postEdit/PostWriteC";

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

  & .submitArea {
    @media (max-width: 768px) {
      justify-content: center;
    }
  }

  & .linkBtn {
    padding: 7px 30px;
    font-size: 1.2em;
  }
`;

const PostWrite = () => {
  return (
    <WriteContainer>
      <GlobalStyle />
      <PostWriteC type="full" />
    </WriteContainer>
  );
};

export default PostWrite;

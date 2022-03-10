import React from "react";

// style
import styled from "styled-components";

// toast-viewer
import { Viewer } from "@toast-ui/react-editor";

const Wrapper = styled.article`
  padding: 20px 0;
  /* 토스트ui viewer */
  .toastui-editor-contents {
    font-size: 1.6em;
    @media (max-width: 768px) {
      font-size: 1.4em;
    }
  }
`;
const PostContent = ({ content }) => {
  return (
    <Wrapper>
      <Viewer initialValue={content} />
    </Wrapper>
  );
};

export default PostContent;

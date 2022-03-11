import React from "react";

// toast-ui editor
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

const PostContentInput = ({ editorRef, shape }) => {
  return (
    <Editor
      initialValue="hello react editor world!"
      previewStyle={shape === "full" ? "vertical" : "tab"}
      height={shape === "full" ? "800px" : "400px"}
      initialEditType="markdown"
      useCommandShortcut={true}
      ref={editorRef}
    />
  );
};

export default PostContentInput;

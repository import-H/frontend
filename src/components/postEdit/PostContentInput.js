import React from "react";

// toast-ui editor
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

const PostContentInput = ({ editorRef, size }) => {
  return (
    <Editor
      initialValue="hello react editor world!"
      previewStyle={size === "max" ? "vertical" : "tab"}
      height={size === "max" ? "800px" : "400px"}
      initialEditType="markdown"
      useCommandShortcut={true}
      ref={editorRef}
    />
  );
};

export default PostContentInput;

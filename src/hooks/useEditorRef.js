import { useEffect, useRef } from "react";
import { API_URL } from "../config";
import axiosInstance from "../utils/axiosInstance";

const useEditorRef = () => {
  const editorRef = useRef(null);
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
  return editorRef;
};

export default useEditorRef;

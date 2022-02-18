import React, { useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import axiosInstance from "../utils/axiosInstance";

const WritePersonalPost = () => {
  const editorRef = useRef(null);

  const onSubmit = () => {
    e.preventDefault();
    console.log("url", url);
    const instance = editorRef.current.getInstance().getMarkdown();
    const findImage = /!\[Image\]\([A-Za-z0-9\/:\-.]+\)/gi;

    let imgUrls =
      instance.match(findImage) &&
      instance.match(findImage).map(url => url.split("/").pop());
    imgUrls =
      imgUrls && imgUrls.map(imgUrl => imgUrl.substring(0, imgUrl.length - 1));

    const postData = {
      title: title,
      tags: tags,
      content: instance, //setPost에서 content 수정하면 바로 반영안되는 문제로 이렇게 해결함
      images: imgUrls,
    };
    //dispatch(addPost({ boardId, postData }));
  };

  useEffect(() => {
    if (editorRef.current) {
      // 기존에 Image 를 Import 하는 Hook 을 제거한다.
      editorRef.current.getInstance().removeHook("addImageBlobHook");

      // 새롭게 Image 를 Import 하는 Hook 을 생성한다.
      editorRef.current
        .getInstance()
        .addHook("addImageBlobHook", (blob, callback) => {
          (async function () {
            let formData = new FormData();
            formData.append("image", blob);

            const response = await axiosInstance.post(
              `http://localhost:8090/v1/file/upload`,
              formData,
              { header: { "content-type": "multipart/formdata" } },
            );

            const url = `http://localhost:8090${response.data.data.imageURL}`;

            console.log(url);
            callback(url, "Image");
          })();

          return false;
        });
    }

    return () => {};
  }, [editorRef]);

  return (
    <div>
      <Editor
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height={"400px"}
        initialEditType="markdown"
        useCommandShortcut={true}
        previewStyle="tab"
        ref={editorRef}
      />
      <button onClick={onSubmit}>작성하기</button>
    </div>
  );
};

export default WritePersonalPost;

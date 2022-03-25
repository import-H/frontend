import React from "react";
import axiosInstance from "../utils/axiosInstance";

const useImageChange = async e => {
  const formData = new FormData();
  const img = e.target.files[0];
  formData.append("image", img);

  const response = await axiosInstance.post(
    `${API_URL}/v1/file/upload`,
    formData,
    { header: { "content-type": "multipart/formdata" } },
  );

  const url = `${API_URL}${response.data.data.imageURL}`;
  return { profileImage: url };
};

export default useImageChange;

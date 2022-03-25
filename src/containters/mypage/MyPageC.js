import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyPageTemplate from "../../components/mypage/MyPageTemplate";
import { updateUser } from "../../redux/slices/authSlice";
import { editProfile, getProfile } from "../../redux/slices/userSlice";
import axiosInstance from "../../utils/axiosInstance";

const MyPageC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userId);
  const user = useSelector(state => state.user.profile);

  const [isChange, setIsChange] = useState(false);
  const [data, setData] = useState();

  const onChange = e => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmit = () => {
    if (isChange) {
      dispatch(editProfile({ userId: userId, userData: data }));
      dispatch(updateUser());
      setIsChange(false);
    } else {
      setIsChange(true);
    }
  };

  const onImageChange = async e => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("image", img);

    const response = await axiosInstance.post(
      `${API_URL}/v1/file/upload`,
      formData,
      { header: { "content-type": "multipart/formdata" } },
    );

    const url = `${API_URL}${response.data.data.imageURL}`;
    setData({ ...data, profileImage: url });
  };

  useEffect(() => {
    dispatch(getProfile(userId));
  }, []);

  useEffect(() => {
    setData({
      infoByEmail: user?.infoByEmail || "",
      infoByWeb: user?.infoByWeb || "",
      introduction: user?.introduction || "",
      nickname: user?.nickname || "",
      personalUrl: user?.personalUrl || "",
      profileImage: user?.profileImage || "",
    });
  }, [user]);

  return (
    <MyPageTemplate
      onSubmit={onSubmit}
      onImageChange={onImageChange}
      onChange={onChange}
      user={user}
      userId={userId}
      isChange={isChange}
      data={data}
    />
  );
};

export default MyPageC;

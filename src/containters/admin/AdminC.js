import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddBanner from "../../components/admin/AddBanner";
import BannerList from "../../components/admin/BannerList";
import {
  addBanner,
  deleteBanner,
  getBanner,
} from "../../redux/slices/mainSlice";
const AdminC = () => {
  const dispatch = useDispatch();
  const banners = useSelector(state => state.main.banners);

  const [presentBanner, setPresentBanner] = useState({
    title: "",
    imgUrl: "",
    url: "",
    content: "",
  });

  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");

  const onTagPush = () => {
    if (!tags.includes(currentTag)) setTags([...tags, currentTag]);
    setCurrentTag("");
  };

  const onAddBanner = async e => {
    e.preventDefault();

    const data = {
      ...presentBanner,
      nickname: "관리자",
      tags: tags,
    };

    dispatch(addBanner(data));
  };

  const onImageChage = async e => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("image", img);

    const response = await axiosInstance.post(
      `${API_URL}/v1/file/upload`,
      formData,
      { header: { "content-type": "multipart/formdata" } },
    );

    const url = `${API_URL}${response.data.data.imageURL}`;
    setPresentBanner({ ...presentBanner, imgUrl: url });
  };

  const onRemoveBanner = async bannerId => {
    await dispatch(deleteBanner(bannerId));
  };

  const onChangeElement = e => {
    const { value, name } = e.target;
    setPresentBanner({ ...presentBanner, [name]: value });
  };

  const onRemoveTag = tags => {
    setTags(tags.filter(t => t !== tag));
  };

  useEffect(() => {
    dispatch(getBanner());
  }, []);

  return (
    <>
      <AddBanner
        presentBanner={presentBanner}
        onImageChage={onImageChage}
        onChangeElement={onChangeElement}
        onRemoveTag={onRemoveTag}
        onTagPush={onTagPush}
        onAddBanner={onAddBanner}
      />
      <BannerList banners={banners} onRemoveBanner={onRemoveBanner} />
    </>
  );
};

export default AdminC;

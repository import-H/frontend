import React, { useEffect } from "react";
import Posts from "../../components/main/Posts";
import { useDispatch, useSelector } from "react-redux";
import { getMainPosts } from "../../redux/slices/mainSlice";

const MainC = () => {
  const dispatch = useDispatch();

  const posts = useSelector(state => state.main.posts);

  useEffect(() => {
    dispatch(getMainPosts(0));
  }, []);
  return (
    <>
      <Posts posts={posts} />
    </>
  );
};

export default MainC;

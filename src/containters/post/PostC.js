import React, { useEffect } from "react";
import PostTemplate from "../../components/post/PostTemplate";
import {
  addLike,
  deleteLike,
  deletePost,
  getPost,
} from "../../redux/slices/postSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const PostC = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const post = useSelector(state => state.post.post);
  const profile = useSelector(state => state.user?.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const boardId = useParams().boardId;
  const postId = useParams().postId;

  const onDeletePost = async () => {
    dispatch(deletePost({ boardId, postId }));
    navigate(-1);
  };

  const onClickLike = async e => {
    e.preventDefault();
    if (isAuth) {
      post.like
        ? await dispatch(deleteLike(postId))
        : await dispatch(addLike(postId));
      await dispatch(getPost(postId));
    }
  };

  useEffect(async () => {
    await dispatch(getPost(postId));
  }, []);
  return (
    <PostTemplate
      isAuth={isAuth}
      post={post}
      profile={profile}
      onDeletePost={onDeletePost}
      onClickLike={onClickLike}
      postId={postId}
      boardId={boardId}
    />
  );
};

export default PostC;

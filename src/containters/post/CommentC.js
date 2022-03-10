import React, { useState } from "react";
import Comment from "../../components/Comment";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  deleteComment,
  editComment,
  getPost,
} from "../../redux/slices/postSlice";

const CommentC = ({ comments, postId }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  const userNickname = useSelector(state => state?.user?.profile?.nickname);
  const [commentData, setCommentData] = useState("");
  const [commentEdit, setCommentEdit] = useState({
    id: "",
    content: "",
  });

  // 댓글 등록
  const onPostComment = async () => {
    await dispatch(addComment({ postId, commentData }));
    setCommentData("");
    dispatch(getPost(postId));
  };

  // 댓글 제거
  const onRemoveComment = async commentId => {
    await dispatch(deleteComment({ postId, commentId }));
    dispatch(getPost(postId));
  };

  // 댓글 수정
  const onEditComment = async (commentId, content) => {
    if (commentEdit.id !== "") {
      await dispatch(
        editComment({ postId, commentId, content: commentEdit.content }),
      );
      setCommentEdit({ id: "", content: "" });
    } else {
      setCommentEdit({ id: commentId, content: content });
    }
    dispatch(getPost(postId));
  };

  const onChangeComment = e => {
    setCommentData(e.target.value);
  };

  const onChangeEditComment = e => {
    setCommentEdit({ ...commentEdit, content: e.target.value });
  };
  return (
    <Comment
      comments={comments}
      postId={postId}
      isAuth={isAuth}
      onPostComment={onPostComment}
      onEditComment={onEditComment}
      onChangeComment={onChangeComment}
      onRemoveComment={onRemoveComment}
      userNickname={userNickname}
      commentData={commentData}
      commentEdit={commentEdit}
      onChangeEditComment={onChangeEditComment}
    />
  );
};

export default CommentC;

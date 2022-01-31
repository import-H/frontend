// import PostForm from "../components/PostForm";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../reducers/slices/postSlice";

const Main = () => {
  const dispatch = useDispatch();
  const nickname = useSelector(state => state.post.nickname);
  const userBtn = () => {
    dispatch(getUser());
  };
  return (
    <div style={{ marginTop: "2rem" }}>
      <div>
        user nickname: <b>{nickname}</b>
      </div>
      <button onClick={userBtn}>유저 정보 조회</button>
    </div>
  );
};

export default Main;

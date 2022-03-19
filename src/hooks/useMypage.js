import { useState } from "react";

const useMyPage = user => {
  const [data, setData] = useState({
    infoByEmail: user?.infoByEmail,
    infoByWeb: user?.infoByWeb,
    introduction: user?.introduction,
    nickname: user?.nickname,
    personalUrl: user?.personalUrl,
    profileImage: user?.profileImage,
  });

  const onChange = e => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };
  console.log(data);

  return { data, onChange, setData };
};

export default useMyPage;

// react
import React, { useState, useEffect } from "react";

// react-router-dom
import NavBar from "../../components/navbar/Navbar";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getMessages, getProfile } from "../../redux/slices/userSlice";

const NavbarC = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const [visible, setVisible] = useState(false);

  // Drawer(Sidebar) view 상태변화
  const onChangeDrawer = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (auth.isAuth) {
      dispatch(getProfile(auth.userId));
      dispatch(getMessages());
    }
  }, []);

  return (
    <NavBar visible={visible} onChangeDrawer={onChangeDrawer} auth={auth} />
  );
};

export default NavbarC;

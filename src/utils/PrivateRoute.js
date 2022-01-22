// route
import { Route, Navigate } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

// 로그인 해야만 접속가능한 PrivateRoute
function PrivateRoute({ component: RouteComponent }) {
  const isAuth = useSelector((state) => state.auth.isAuth);
  console.log(isAuth);
  if (isAuth) {
    return <RouteComponent />;
  }
  return <Navigate to="/" />;
}
export default PrivateRoute;

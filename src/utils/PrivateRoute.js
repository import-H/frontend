// route
import { Route, Navigate } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

// 로그인 해야만 접속가능한 PrivateRoute
function PrivateRoute({ component: RouteComponent }) {
  const admin = useSelector(state => state.auth.roles);
  console.log(admin);
  if (admin === "ROLE_ADMIN") {
    return <RouteComponent />;
  }
  return <Navigate to="/" />;
}
export default PrivateRoute;

// https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5 참고

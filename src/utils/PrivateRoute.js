import { Route, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

function PrivateRoute({ component: RouteComponent }) {
  const isAuth = useSelector((state) => state.auth.isAuth);
  console.log(isAuth);
  if (isAuth) {
    return <RouteComponent />;
  }
  return <Navigate to="/" />;
}
export default PrivateRoute;

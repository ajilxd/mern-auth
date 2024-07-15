import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function AdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user?.admin);

  return currentUser ? <Outlet /> : <Navigate to="/admin" />;
}

export default AdminPrivateRoute;

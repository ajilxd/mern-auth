import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

export default function AdminHeaderRoute() {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
}

import AdminNavbar from "../admin/components/AdminNavbar";
import { Outlet } from "react-router";
import AdminSidebar from "../admin/components/AdminSidebar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-65px)] overflow-y-autp
        ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;

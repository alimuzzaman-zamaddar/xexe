import { Outlet } from "react-router";
import Sidebar from "../components/Admindashboard/Sidebar";

const AdminDashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;

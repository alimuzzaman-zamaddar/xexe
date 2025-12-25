import { Outlet } from "react-router";
import UserSidebar from "../components/Userdashboard/UserSidebar";



const UserdashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <UserSidebar />
      <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default UserdashboardLayout
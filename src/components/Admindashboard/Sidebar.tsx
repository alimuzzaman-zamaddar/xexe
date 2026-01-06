import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Logo from "../../assets/images/dashboardlogo.png";
import Sidebarimg from "../../assets/images/sidebarimg.png";
import userSidebarimg from "../../assets/images/usersidebarimg1.png";
import {
  Dashboardicon,
  Scanfiles,
} from "../../assets/icons/Icons";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAuth } from "../../Hooks/useAuth";
import { Modal } from "antd";
import { useLogout } from "../../Services/auth.api.hook";
import type { User } from "../../Provider/AuthProvider";
import { useCurrentSubscription } from "../../Services/subscription.hook";
import { FaHome } from "react-icons/fa";

export interface NavItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

export const navMenu: NavItem[] = [
  { name: "dashboard", icon: <Dashboardicon />, path: "/admindashboard" },
  { name: "Scanned Files", icon: <Scanfiles />, path: "allfiles" },
  { name: "Scan Files", icon: <Scanfiles />,path: "scanfiles", },
  { name: "Go Home", icon: <FaHome />, path: "/" },
];

export const Settingmenu: NavItem[] = [
  // { name: "Preferences", icon: <Inbox />, path: "" },
  // { name: "Support", icon: <Inbox />, path: "" },
];

const Sidebar = () => {
    const { user }: { user: User | null } = useAuth();
      const { data } = useCurrentSubscription();
      console.log(data, "current subscription data");
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  console.log(user)
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

    const showModal = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000); 
  };

  const isPathActive = (path: string) => location.pathname === path;
  const handleClick = (path: string) => navigate(path);

  const { mutate: logout, isPending } = useLogout();

  return (
    <>
      <div className="lg:hidden fixed top-4 left-0 right-0 z-50 flex items-center justify-end w-full px-4">
        <button
          className=" z-50 bg-white p-2 rounded shadow"
          onClick={() => setIsOpen(!isOpen)}
        >
          <RxHamburgerMenu />
        </button>
      </div>

      <div
        className={`bg-[#003072] fixed top-0 left-0 h-screen z-50 transition-transform duration-500 ease-in-out px-3 py-[45px] w-[260px] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:flex lg:flex-col lg:w-[350px]`}
      >
        <figure className="flex justify-center">
          <img src={Logo} alt="Logo" />
        </figure>

        <ul className="pt-20 pb-12 flex flex-col gap-3">
          {navMenu.map((menu, index) => {
            const isActive = isPathActive(menu.path);
            return (
              <li
                key={index}
                onClick={() => {
                  handleClick(menu.path);
                  setIsOpen(false);
                }}
                className={`font-popins text-[18px] flex gap-x-5 items-center pl-[50px] font-medium px-4 py-3 rounded-[10px] transition-all duration-200 cursor-pointer capitalize ${
                  isActive
                    ? "bg-[#52ABFF] text-white"
                    : "text-white hover:bg-[#52ABFF]"
                }`}
              >
                {menu.icon}
                {menu.name}
              </li>
            );
          })}
        </ul>

        <div className="pt-10">
          <ul className="pt-5 flex flex-col gap-3">
            {Settingmenu.map((menu, index) => {
              const isActive = isPathActive(menu.path);
              return (
                <li
                  key={index}
                  onClick={() => {
                    handleClick(menu.path);
                    setIsOpen(false);
                  }}
                  className={`font-popins text-[18px] flex gap-x-5 items-center pl-[50px] font-medium px-4 py-3 rounded-[10px] transition-all duration-200 cursor-pointer capitalize ${
                    isActive
                      ? "bg-[#52ABFF] text-white"
                      : "text-white hover:bg-[#52ABFF]"
                  }`}
                >
                  {menu.icon}
                  {menu.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div onClick={showModal}  className="flex cursor-pointer mt-auto gap-x-3 items-center pt-6 pl-[50px]">
          <figure>
            <img src={Sidebarimg} alt="Sidebarimg" />
          </figure>
          <div className="flex flex-col">
            <h4 className="font-popins text-[24px] font-normal text-[#FFF]">
               {user?.name || "User Name"}
            </h4>
            <h5 className="font-popins text-[16px] font-normal text-[#ADADAD]">
            {user?.role || "User Role"}
            </h5>
          </div>
        </div>
      </div>

        <Modal
          open={open}
          onCancel={() => setOpen(false)}
          closable={true}
          footer={null}
          centered
          maskClosable={false}
          className="custom-user-modal"
          width={800}
        >
          {loading ? (
            <div className="text-center py-10 font-popins text-[#003072] text-lg">
              Loading...
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex flex-col justify-between">
                <figure>
            <img
              src={
                user?.avatar
                  ? `${import.meta.env.VITE_SITE_URL}/${user.avatar}`
                  : userSidebarimg
              }
              alt="userSidebarimg"
              className="xl:w-[200px]"
            />
                </figure>
                <div className="">
                  <button
                    onClick={() => logout()}
                    className="px-5 py-2 bg-red-800 text-white cursor-pointer rounded-full"
                  >
                    {isPending ? "Logging out..." : "Logout"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col w-full">
                <div className="bg-[#FFF] shadow-2xl p-[30px] rounded-[20px]">
                  <div>
                    <label className="block text-[16px] md:text-[20px] font-semibold text-[#232323] font-popins capitalize pb-2 md:pb-4">
                      {user?.name || "Username"}
                    </label>
                    <input
                      type="text"
                      placeholder={user?.name || "Username"}
                      className="rounded-[12px] md:rounded-[10px] bg-[#F9F9F9] px-6 py-3 w-full text-[16px] md:text-[18px] text-[#ADADAD] font-popins outline-none border-none"
                    />
                  </div>
                  <div className="pt-4">
                    <label className="block text-[16px] md:text-[20px] font-semibold text-[#232323] font-popins capitalize pb-2 md:pb-4">
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder={user?.email || "Email"}
                      className="rounded-[12px] md:rounded-[10px] bg-[#F9F9F9] px-6 py-3 w-full text-[16px] md:text-[18px] text-[#ADADAD] font-popins outline-none border-none"
                    />
                  </div>
                </div>

              </div>
            </div>
          )}
        </Modal>
    </>
  );
};

export default Sidebar;

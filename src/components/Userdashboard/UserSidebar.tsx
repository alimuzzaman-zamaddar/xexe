import { useLocation, useNavigate } from "react-router";
import { useMemo, useState } from "react";
import Logo from "../../assets/images/dashboardlogo.png";
import userSidebarimg from "../../assets/images/usersidebarimg1.png";
import type { ReactNode } from "react";
import { Reposts, Scanfiles } from "../../assets/icons/Icons";
import { Modal } from "antd";
import { Menu } from "react-feather";
import { useAuth } from "../../Hooks/useAuth";
import { useLogout, useUpdateUserData } from "../../Services/auth.api.hook";
import type { User } from "../../Provider/AuthProvider";
import {
  useCancelSubscription,
  useCurrentSubscription,
} from "../../Services/subscription.hook";
import toast from "react-hot-toast";
import { FaHome, FaUsers } from "react-icons/fa";
import Loader from "../Loader/Loader";
import { MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";

// ✅ Interface fix
interface UpdateUserPayload {
  name: string;
  email: string;
  avatar?: File | null; // Optional avatar field
}

export interface NavItem {
  name: string;
  icon: ReactNode;
  path: string;
}

// export const navMenu: NavItem[] = [
//   {
//     name: "Go Home",
//     icon: <FaHome />,
//     path: "/",
//   },
//   {
//     name: "Scan Files",
//     icon: <Scanfiles />,
//     path: "/userdashboard",
//   },
//   {
//     name: "Reports",
//     icon: <Reposts />,
//     path: "/userdashboard/reports",
//   },
//   {
//     name: "Change Password",
//     icon: <Reposts />,
//     path: "/userdashboard/change-password",
//   },
//   // Conditionally push this item
//   ...(data?.plan === "Enterprise" &&
//   user?.role !== "viewer" &&
//   user?.role !== "analyst"
//     ? [
//         {
//           name: "Create User",
//           icon: <Reposts />,
//           path: "/userdashboard/create-user",
//         },
//       ]
//     : []),
// ];


// ✅ Extracted and functional UpdateUserForm
const UpdateUserForm = ({
  user,
  onClose,
}: {
  user: { name: string; email: string };
  onClose: () => void;
}) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const { mutate: updateUser, isPending } = useUpdateUserData();
  const { refetchUser } = useAuth();
  const [avatar, setAvatar] = useState<File | null>(null);
  console.log("Avatar:", avatar);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: UpdateUserPayload = { name, email, avatar }; 

    updateUser(payload, {
      onSuccess: () => {
        refetchUser();
        onClose(); // ✅ Close modal on success
        toast.success("User updated success");
      },
    });
  };

  


  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-[#FFF] shadow-2xl p-[30px] rounded-[20px]">
        <div>
          <label className="block text-[16px] md:text-[20px] font-semibold text-[#232323] font-popins capitalize pb-2 md:pb-4">
            Username
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Username"
            className="rounded-[12px] md:rounded-[10px] bg-[#F9F9F9] px-6 py-3 w-full text-[16px] md:text-[18px] text-[#232323] font-popins outline-none border-none"
          />
        </div>
        <div className="pt-4">
          <label className="block text-[16px] md:text-[20px] font-semibold text-[#232323] font-popins capitalize pb-2 md:pb-4">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded-[12px] md:rounded-[10px] bg-[#F9F9F9] px-6 py-3 w-full text-[16px] md:text-[18px] text-[#232323] font-popins outline-none border-none"
          />
        </div>
        <div className="pt-4">
          <label className="block text-[16px] md:text-[20px] font-semibold text-[#232323] font-popins capitalize pb-2 md:pb-4">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files?.[0] || null)}
            className="rounded-[12px] bg-[#F9F9F9] px-6 py-3 w-full text-sm text-[#232323] font-popins"
          />
        </div>

        <div className="pt-6 text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-[#52ABFF] transition"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </form>
  );
};

// ✅ Main Sidebar Component
const UserSidebar = () => {
  const { user }: { user: User | null } = useAuth();
  console.log(user);
  // const storUser = localStorage.getItem("user");
  // console.log(storUser);
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { data } = useCurrentSubscription();
  const { mutate: logout, isPending } = useLogout();

  const showModal = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000); // loading simulation
  };

  const isPathActive = (path: string) => location.pathname === path;

  const handleClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const { mutate: cancel, isError, isSuccess } = useCancelSubscription();

  const handleCancel = () => {
    cancel(); // Trigger the cancel subscription mutation
  };


  // inside UserSidebar component
const navMenu = useMemo(() => {
  const menu: NavItem[] = [
    {
      name: "Go Home",
      icon: <FaHome />,
      path: "/",
    },
    {
      name: "Scan Files",
      icon: <Scanfiles />,
      path: "/userdashboard",
    },
    {
      name: "Reports",
      icon: <Reposts />,
      path: "/userdashboard/reports",
    },
  ];

  // ✅ Conditionally insert "Create User"
  if (
    data?.plan === "Enterprise" &&
    user?.role !== "viewer" &&
    user?.role !== "analyst"
  ) {
    menu.push({
      name: "Create User",
      icon: <FaUsers />,
      path: "/userdashboard/create-user",
    });
  }

  // ✅ Always add Change Password at the end
  menu.push({
    name: "Change Password",
    icon: <MdPassword />,
    path: "/userdashboard/change-password",
  });

  return menu;
}, [data, user]);
  

  return (
    <>
      <div className="lg:hidden fixed top-4 left-0 right-0 z-50 flex items-center justify-end w-full px-4">
        <button
          className="z-50 bg-white p-2 rounded shadow"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="text-[#003072]" />
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 z-40 h-full bg-[#003072] flex flex-col px-3 py-[45px]
        w-[260px] transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:h-screen lg:w-[350px]`}
      >
        <Link to="/">
          <figure className="flex justify-center">
            <img src={Logo} alt="Logo" className="max-w-[160px]" />
          </figure>
        </Link>

        <ul className="pt-20 pb-12 flex flex-col gap-3">
          {navMenu.map((menu, index) => (
            <li
              key={index}
              onClick={() => handleClick(menu.path)}
              className={`font-popins text-[18px] flex gap-x-5 items-center pl-10 font-medium px-4 py-3 rounded-[10px] transition-all duration-200 cursor-pointer capitalize ${
                isPathActive(menu.path)
                  ? "bg-[#52ABFF] text-white"
                  : "text-white hover:bg-[#52ABFF]"
              }`}
            >
              {menu.icon}
              {menu.name}
            </li>
          ))}
        </ul>

        <div
          className="mt-auto flex gap-x-3 items-center pt-6 pl-10 cursor-pointer"
          onClick={showModal}
        >
          <figure>
            <img
              src={
                user?.avatar
                  ? `${import.meta.env.VITE_SITE_URL}/${user.avatar}`
                  : userSidebarimg
              }
              alt="userSidebarimg"
              className="w-10 h-10 rounded-full"
            />
          </figure>
          <div className="flex flex-col">
            <h4 className="font-popins text-[20px] font-normal text-[#FFF]">
              {user?.name || "User Name"}
            </h4>
            <h5 className="font-popins text-[14px] font-normal text-[#ADADAD]">
              {user?.role || "User Role"}
            </h5>
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
              <Loader className="mt-10 text-3xl text-blue-500" />
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
                  <div className="mt-3">
                    {data?.isSubscriptionActive &&
                    user?.role !== "viewer" &&
                    user?.role !== "analyst" ? (
                      <button
                        onClick={handleCancel}
                        // disabled={isPending} // Disable button while loading
                        className="px-5 py-2 bg-red-800 text-white cursor-pointer rounded-full"
                      >
                        Unsubscribe
                      </button>
                    ) : (
                      ""
                    )}

                    {isSuccess && <p>Subscription canceled successfully!</p>}
                    {isError && (
                      <p>Error occurred while canceling the subscription!</p>
                    )}

                    {!data?.isSubscriptionActive ? (
                      <Link to="/pricing">
                        <button className="px-3 shrink-0 h-[48px]  border border-[#003072] rounded-[10px] font-inter hover:bg-white hover:text-[#003072] font-semibold bg-[#003072] text-white transition-all duration-300 w-fit">
                          Subscribe
                        </button>
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full">
                {user && (
                  <UpdateUserForm user={user} onClose={() => setOpen(false)} />
                )}

                <div className="bg-[#FFF] shadow-2xl p-[30px] rounded-[20px] mt-5">
                  <h4 className="font-popins text-[20px] text-[#111315]">
                    Current Subscription
                  </h4>
                  <div className="flex flex-col md:flex-row justify-between gap-5 items-start md:items-center">
                    <p className="text-[#ADADAD] font-popins text-base sm:text-lg">
                      {data?.description || "Free Trial"}
                    </p>

                    {data?.plan == "Free Trial" ? (
                      <Link to="/pricing">
                        <button className="px-3 shrink-0 h-[48px] mt-5 border border-[#003072] rounded-[10px] font-inter hover:bg-white hover:text-[#003072] font-semibold bg-[#003072] text-white transition-all duration-300 w-fit">
                          Go Pro
                        </button>
                      </Link>
                    ) : (
                      <button className="px-3 shrink-0 h-[48px] mt-5 border border-[#003072] rounded-[10px] font-inter hover:bg-white hover:text-[#003072] font-semibold bg-[#003072] text-white transition-all duration-300 w-fit">
                        {data?.plan || "Free Trial"}
                      </button>
                    )}
                  </div>
                  <div className="mt-5 flex justify-between">
                    <h3 className="text-[#232323] font-popins text-sm md:text-base">
                      Deadline
                    </h3>
                    <p className="text-[#ADADAD] font-popins text-sm md:text-base">
                      {data?.expire_date || "You got 6 days"}
                    </p>
                  </div>
                  {data?.isSubscriptionActive &&
                    user?.role !== "viewer" &&
                    user?.role !== "analyst" &&
                    (data?.invoices?.length ?? 0) > 0 && (
                      <a
                        href={data?.invoices?.[0]?.download_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-5 px-5 py-1 bg-[#003072] text-white rounded-[10px] border border-[#003072] font-inter font-medium hover:bg-white hover:text-[#003072] hover:border hover:border-[#003072] transition-all duration-300"
                        style={{
                          display: data?.isSubscriptionActive
                            ? "inline-block"
                            : "none",
                        }}
                      >
                        Download Invoice
                      </a>
                    )}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default UserSidebar;

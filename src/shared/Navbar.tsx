import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "react-feather";
import Container from "./Container";
import Logo from "../assets/images/Logo.png";
import { useAuth } from "../Hooks/useAuth";
import { useLogout } from "../Services/auth.api.hook";
import { useFreeTrial } from "../Services/subscription.hook";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  console.log(user);
  const { mutate: logout } = useLogout();
  const { mutate: triggerFreeTrial, isPending } = useFreeTrial();
  
  const navigate = useNavigate()
  const handleFreeTrial = () => {
    if (!user?.email) {
      navigate("/signup")
      toast.error("You must be logged in to try free trial.");
      return;
    }

    triggerFreeTrial({
      email: user.email,
      success_redirect_url: window.location.href,
      cancel_redirect_url: window.location.href,
    });
  };

  return (
    <nav id="nav" className="lg:pt-[60px] pt-[30px] lg:px-4 px-4" >
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex gap-x-[96px] items-center">
            <figure>
              <Link to="/">
              <img src={Logo} alt="Logo" />
              </Link>
            </figure>

            <ul className="hidden lg:flex ">
              <Link to="/">
                <li className="text-[20px] font-popins text-[#ADADAD] hover:text-[#52ABFF] hover:scale-105 hover:tracking-wide transition-all duration-300 ease-in-out w-[120px] cursor-pointer">
                  Home
                </li>
              </Link>
              <Link to="/pricing">
                <li className="text-[20px] font-popins text-[#ADADAD] hover:text-[#52ABFF] hover:scale-105 hover:tracking-wide transition-all duration-300 ease-in-out w-[120px] cursor-pointer">
                  Pricing
                </li>
              </Link>
              <Link to="/contact">
                <li className="text-[20px] font-popins text-[#ADADAD] hover:text-[#52ABFF] hover:scale-105 hover:tracking-wide transition-all duration-300 ease-in-out w-[120px] cursor-pointer">
                  Contact
                </li>
              </Link>
            </ul>
          </div>

          <div className="hidden lg:flex gap-x-[10px]">
            {!user?.isTrial && !user?.isSubscribed ? (
              <button
                onClick={handleFreeTrial}
                disabled={isPending}
                className="px-7 py-[10px] border border-[#52ABFF] rounded-lg font-inter text-[22px] text-[#52ABFF] font-semibold hover:bg-[#52ABFF] hover:text-[#FFF] transition-all duration-300 cursor-pointer"
              >
                {isPending ? "Redirecting..." : "Try for free"}
              </button>
            ) : (
              ""
            )}

            {user ? (
              user.role === "admin" ? (
                <Link to="/admindashboard">
                  <button className="px-7 py-[10px] border border-[#52ABFF] rounded-lg font-inter text-[22px] hover:bg-[#FFF] hover:text-[#52ABFF] font-semibold bg-[#52ABFF] text-[#FFF] transition-all duration-300 cursor-pointer">
                    Admin Dashboard
                  </button>
                </Link>
              ) : user?.role === "viewer" || user?.role === "analyst" || user.isSubscribed || user.isTrial ? (
                <Link to="/userdashboard">
                  <button className="px-7 py-[10px] border border-[#52ABFF] rounded-lg font-inter text-[22px] hover:bg-[#FFF] hover:text-[#52ABFF] font-semibold bg-[#52ABFF] text-[#FFF] transition-all duration-300 cursor-pointer">
                    User Dashboard
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => logout()}
                  className="px-7 py-[10px] border border-[#52ABFF] rounded-lg font-inter text-[22px] hover:bg-[#FFF] hover:text-[#52ABFF] font-semibold bg-[#52ABFF] text-[#FFF] transition-all duration-300 cursor-pointer"
                >
                  Logout
                </button>
              )
            ) : (
              <Link to="/login">
                <button className="px-7 py-[10px] border border-[#52ABFF] rounded-lg font-inter text-[22px] hover:bg-[#FFF] hover:text-[#52ABFF] font-semibold bg-[#52ABFF] text-[#FFF] transition-all duration-300 cursor-pointer">
                  Login
                </button>
              </Link>
            )}
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(true)}>
              <Menu size={28} className="text-[#52ABFF]" />
            </button>
          </div>
        </div>
      </Container>

      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-[250px] bg-[#003072] z-50 transform transition-transform duration-700 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-5 pt-6">
          <Link to="/">
          <img src={Logo} alt="Logo" className="h-10" />
          </Link>
          <button onClick={() => setIsMenuOpen(false)} className="text-white">
            <X size={28} />
          </button>
        </div>
        <ul className="flex flex-col gap-6 mt-10 px-6">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <li className="text-[20px] font-popins text-white hover:text-[#52ABFF] cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/pricing" onClick={() => setIsMenuOpen(false)}>
            <li className="text-[20px] font-popins text-white hover:text-[#52ABFF] cursor-pointer">
              Pricing
            </li>
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
            <li className="text-[20px] font-popins text-white hover:text-[#52ABFF] cursor-pointer">
              Contact
            </li>
          </Link>
        </ul>
        <div className="mt-10 px-6 flex flex-col gap-4">
          {!user?.isTrial && !user?.isSubscribed ? (
            <button
              onClick={handleFreeTrial}
              disabled={isPending}
              className="px-7 py-[10px] border border-[#52ABFF] rounded-lg font-inter text-[22px] text-[#52ABFF] font-semibold hover:bg-[#52ABFF] hover:text-[#FFF] transition-all duration-300 cursor-pointer"
            >
              {isPending ? "Redirecting..." : "Start Free Trial"}
            </button>
          ) : (
            ""
          )}
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>
            {user ? (
              user.role === "admin" ? (
                <Link to="/admindashboard">
                  <button className="px-7 py-[10px] border border-[#52ABFF] rounded-lg font-inter text-[22px] hover:bg-[#FFF] hover:text-[#52ABFF] font-semibold bg-[#52ABFF] text-[#FFF] transition-all duration-300 cursor-pointer">
                    Admin Dashboard
                  </button>
                </Link>
              ) : user?.role === "viewer" ||
                (user?.role === "analyst" && user.isSubscribed) ||
                user.isTrial ? (
                <Link to="/userdashboard">
                  <button className="px-7 py-[10px] border border-[#52ABFF] rounded-lg font-inter text-[22px] hover:bg-[#FFF] hover:text-[#52ABFF] font-semibold bg-[#52ABFF] text-[#FFF] transition-all duration-300 cursor-pointer">
                    User Dashboard
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => logout()}
                  className="px-7 py-[10px] border border-[#52ABFF] rounded-lg font-inter text-[22px] hover:bg-[#FFF] hover:text-[#52ABFF] font-semibold bg-[#52ABFF] text-[#FFF] transition-all duration-300 cursor-pointer"
                >
                  Logout
                </button>
              )
            ) : (
              <Link to="/login">
                <button className="px-7 py-[10px] border border-[#52ABFF] rounded-lg font-inter text-[22px] hover:bg-[#FFF] hover:text-[#52ABFF] font-semibold bg-[#52ABFF] text-[#FFF] transition-all duration-300 cursor-pointer">
                  Login
                </button>
              </Link>
            )}
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;

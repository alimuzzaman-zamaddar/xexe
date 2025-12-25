import { Link } from "react-router-dom";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-[#000] lg:py-[75px] py-10  lg:px-4 px-4">
      <Container>
        <div className="flex flex-col xl:flex-row xl:justify-end xl:items-end gap-6 xl:gap-10 mt-10 px-4 md:px-6 lg:px-0">
                    <div className="xl:flex lg:flex flex-wrap gap-x-12 gap-y-6 xl:w-[50%] ">
            <ul className="flex flex-col gap-[10px] lg:mt-0 mt-5">

              <li className="text-[#52ABFF] font-inter lg:text-[18px] md:text-[16px] font-semibold pb-1">
                Quick Link
              </li>
              <li>
                <a
                  href="/#nav"
                  className="text-[#B8B8B8] font-inter lg:text-[18px] md:text-[16px] font-normal cursor-pointer hover:text-[#76B6F3] hover:underline  duration-300 transition-all ease-in-out"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/#feature"
                  className="text-[#B8B8B8] font-inter lg:text-[18px] md:text-[16px] font-normal cursor-pointer hover:text-[#76B6F3] hover:underline  duration-300 transition-all ease-in-out"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  className="text-[#B8B8B8] font-inter lg:text-[18px] md:text-[16px] font-normal cursor-pointer hover:text-[#76B6F3] hover:underline  duration-300 transition-all ease-in-out"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="text-[#B8B8B8] font-inter lg:text-[18px] md:text-[16px] font-normal cursor-pointer hover:text-[#76B6F3] hover:underline  duration-300 transition-all ease-in-out"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-[#B8B8B8] font-inter lg:text-[18px] md:text-[16px] font-normal cursor-pointer hover:text-[#76B6F3] hover:underline  duration-300 transition-all ease-in-out"
                >
                  Contact
                </a>
              </li>
              <div className="hidden xl:block">
                                          <ul className="flex flex-col gap-[10px] ">
            <li className="text-[#52ABFF] font-inter text-[16px] md:text-[17px] lg:text-[18px] font-semibold pb-1">
              Xeltra Software
            </li>
            <li className="text-[#B8B8B8]  font-inter text-[15px] md:text-[16px] lg:text-[18px] font-normal cursor-pointer  transition-all duration-300 ease-in-out">
             Welserstraße 3, 87463 Dietmannsried, Germany
            </li>
            <li className="text-[#B8B8B8]  font-inter text-[15px] md:text-[16px] lg:text-[18px] font-normal cursor-pointer  transition-all duration-300 ease-in-out">
              © 2025 Xeltra Software. All rights reserved.
            </li>
          </ul>
          </div>

            </ul>

          </div>
          {/* Left Section */}


          {/* Right Section */}
          <div className="flex xl:justify-end  xl:items-end w-full xl:w-[50%]">
            <ul className="flex flex-col gap-[10px] lg:mt-0 mt-5 ">
              <li className="text-[#52ABFF] font-inter lg:text-[18px] md:text-[16px] font-semibold pb-1">
                Company
              </li>
              <li className="text-[#B8B8B8] hover:underline font-inter lg:text-[18px] md:text-[16px] font-normal cursor-pointer hover:text-[#76B6F3]  duration-300 transition-all ease-in-out">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="text-[#B8B8B8]  hover:underline font-inter lg:text-[18px] md:text-[16px] font-normal cursor-pointer hover:text-[#76B6F3]  duration-300 transition-all ease-in-out">
                <Link to="/terms-and-conditions">Terms and condition</Link>
              </li>
              <li className="text-[#B8B8B8] hover:underline font-inter lg:text-[18px] md:text-[16px] font-normal cursor-pointer hover:text-[#76B6F3] duration-300 transition-all ease-in-out">
                <a href="mailto:support@xeltrasoftware.com">support@xeltrasoftware.com</a>
              </li>
                            <div className="block xl:hidden">
                                          <ul className="flex flex-col gap-[10px] ">
            <li className="text-[#52ABFF] font-inter text-[16px] md:text-[17px] lg:text-[18px] font-semibold pb-1">
              Xeltra Software
            </li>
            <li className="text-[#B8B8B8]  font-inter text-[15px] md:text-[16px] lg:text-[18px] font-normal cursor-pointer  transition-all duration-300 ease-in-out">
            Welserstraße 3, 87463 Dietmannsried, Germany
            </li>
            <li className="text-[#B8B8B8]  font-inter text-[15px] md:text-[16px] lg:text-[18px] font-normal cursor-pointer  transition-all duration-300 ease-in-out">
              © 2025 Xeltra Software. All rights reserved.
            </li>
          </ul>
          </div>

            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

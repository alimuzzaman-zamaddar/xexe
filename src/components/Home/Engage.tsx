import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Engagement } from "../../assets/icons/Icons";
import Container from "../../shared/Container";
import Engageimg from "../../assets/images/engageimg.png";
import { Link } from "react-router-dom";

const Engage = () => {
  return (
    <section className="pb-[100px] md:pb-[50px] lg:pb-[150px] 2xl:px-0 px-4">
      <Container>
        <div data-aos="fade-up" className="flex flex-col lg:flex-row items-stretch justify-between gap-[40px] xl:pt-[100px]">
          {/* Left Content */}
          <div className="w-full lg:w-[48%] order-2 lg:order-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row gap-x-5 gap-y-4 items-center sm:items-start text-center sm:text-left">
                <Engagement />
                <h3 className="text-[32px] md:text-[36px] lg:text-[44px] text-[#000] font-popins font-semibold">
                  Engage with Insight
                </h3>
              </div>

              <p className="pt-8 pb-5 text-black font-inter font-bold text-[18px] md:text-[20px] lg:text-[24px] text-center sm:text-left">
                How it work
              </p>

              <ul className="flex flex-col gap-[24px] md:gap-[30px]">
                {[
                  "Dashboard that simplifies complex data into clear risk scores",
                  "Highlighted red flags and keyword matches for quick understanding",
                  "Share or download reports easily to support decisions and team collaboration",
                ].map((text, index) => (
                  <li
                    key={index}
                    className="flex gap-x-4 items-start text-[#313131] text-[16px] md:text-[20px] lg:text-[24px] font-popins font-normal"
                  >
                    <IoCheckmarkCircleSharp className="fill-[#52ABFF] w-[24px] h-[24px] shrink-0 mt-[4px]" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div data-aos="fade-up" className="mt-10 md:mt-[50px] flex justify-center sm:justify-start">
              <Link to="/pricing">
              <button className="px-[28px] md:px-[35px] h-[56px] md:h-[70px] border border-[#52ABFF] rounded-[14px] md:rounded-[18px] font-inter text-[18px] md:text-[24px] font-semibold bg-[#52ABFF] text-white hover:bg-white hover:text-[#52ABFF] transition-all duration-300 cursor-pointer">
                Get Started Now
              </button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div data-aos="fade-up" className="w-full lg:w-[48%] order-1 lg:order-2">
            <div className="w-full h-full p-5 md:p-[40px] lg:p-[60px] bg-[#EBF4FF] rounded-[24px] md:rounded-[30px] flex items-center justify-center">
              <img
                src={Engageimg}
                alt="Engageimg"
                className="w-full h-full object-cover rounded-[16px]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Engage;

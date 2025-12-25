import { Meetup } from "../../assets/icons/Icons";
import Container from "../../shared/Container";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import Smartwayimg from "../../assets/images/support.png";
import { Link } from "react-router-dom";

const SmarterWay = () => {
  return (
    <section
      className="pt-[100px] md:pt-[120px] lg:pt-[152px] 2xl:px-0 px-4"
      id="smartway"
    >
      <Container>
        <h2 data-aos="fade-up" className="font-popins text-[32px] md:text-[48px] lg:text-[56px] text-[#262C30] font-semibold leading-[42px] md:leading-[64px] lg:leading-[84px] text-center">
          The <span className="text-[#52ABFF]">Smarter</span> Way to Connect,
          <br className="hidden md:block" />
          Without the Risk
        </h2>

        <div className="flex flex-col lg:flex-row items-stretch justify-between pt-[60px] md:pt-[80px] lg:pt-[120px] gap-[40px]">
          {/* Left Content */}
          <div className="w-full lg:w-[48%] order-2 lg:order-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-x-4 gap-y-4">
                <Meetup />
                <h3 data-aos="fade-up" className="text-[28px] md:text-[36px] lg:text-[44px] text-[#000] font-popins font-semibold">
                  Verify Before You Connect.
                </h3>
              </div>

              <p data-aos="fade-up" className="pt-8 pb-5 text-[#313131] font-inter font-bold text-[18px] md:text-[20px] lg:text-[24px] text-center sm:text-left">
               Don’t leave trust to chance. Xeltra scans every sender, document, and attachment in real time — so you can act with full confidence.
              </p>

              <ul className="flex flex-col gap-[24px] md:gap-[30px]">
                <li data-aos="fade-up" className="flex gap-x-4 text-[#313131] text-[16px] md:text-[20px] lg:text-[24px] font-popins font-normal items-start">
                  <IoCheckmarkCircleSharp className="fill-[#52ABFF] w-[24px] h-[24px] shrink-0 mt-[4px]" />
                  Dashboard that simplifies complex data into clear risk scores
                </li>
                <li data-aos="fade-up" className="flex gap-x-4 text-[#313131] text-[16px] md:text-[20px] lg:text-[24px] font-popins font-normal items-start">
                  <IoCheckmarkCircleSharp className="fill-[#52ABFF] w-[24px] h-[24px] shrink-0 mt-[4px]" />
                  Unified access to important documents and messages in one
                  secure place
                </li>
                <li data-aos="fade-up" className="flex gap-x-4 text-[#313131] text-[16px] md:text-[20px] lg:text-[24px] font-popins font-normal items-start">
                  <IoCheckmarkCircleSharp data-aos="fade-up" className="fill-[#52ABFF] w-[24px] h-[24px] shrink-0 mt-[4px]" />
                  Built-in sender verification for safer connections
                </li>
              </ul>
            </div>

            <div className="pt-8 md:pt-10 flex justify-center sm:justify-start">
              <Link to="/pricing">
              <button data-aos="fade-up" className="px-[28px] md:px-[35px] h-[56px] md:h-[70px] border border-[#52ABFF] rounded-[14px] md:rounded-[18px] font-inter text-[18px] md:text-[24px] font-semibold bg-[#52ABFF] text-[#FFF] hover:bg-white hover:text-[#52ABFF] transition-all duration-300 cursor-pointer">
                Get Started Now
              </button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div data-aos="fade-right" className="w-full lg:w-[48%] order-1 lg:order-2">
            <div className="w-full h-full p-5 md:p-[40px] lg:p-[60px] bg-[#EBF4FF] rounded-[24px] md:rounded-[30px] flex items-center justify-center h-full">
              <img
                src={Smartwayimg}
                alt="Smartwayimg"
                className="w-full h-full object-cover rounded-[16px]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SmarterWay;

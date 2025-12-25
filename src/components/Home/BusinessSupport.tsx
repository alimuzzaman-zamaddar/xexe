import { Bsuiness } from "../../assets/icons/Icons";
import Container from "../../shared/Container";
import Businessimg from "../../assets/images/stayincontrol.png";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const BusinessSupport = () => {
  return (
    <section className="py-[80px] md:py-[40px] lg:py-[50px] 2xl:px-0 px-4">
      <Container>
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-[40px] lg:pt-[120px]">
          {/* Image */}
          <div data-aos="slide-left" className="w-full lg:w-[48%] order-1 lg:order-1">
            <div className="w-full h-full p-5 md:p-10 lg:p-[60px] bg-[#EBF4FF] rounded-[30px] flex items-center justify-center">
              <img
                src={Businessimg}
                alt="Businessimg"
                className="w-full h-full object-cover rounded-[20px]"
              />
            </div>
          </div>

          {/* Content */}
          <div data-aos="slide-right"  className="w-full lg:w-[48%] order-2 lg:order-2 flex flex-col justify-between">
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-4 text-center md:text-left justify-center md:justify-start">
                <Bsuiness className="mx-auto md:mx-0" />
                <h3 className="text-[28px] md:text-[36px] lg:text-[44px] text-[#000] font-popins font-semibold">
                  Stay in Control
                </h3>
              </div>

              <p className="pt-8 pb-5 text-[#313131]font-inter font-bold text-[20px] md:text-[24px] text-center md:text-left">
                Gain visibility into your entire verification process with audit-ready logs, access controls, and team oversight.
              </p>

              <ul className="flex flex-col gap-[20px]">
                {[
                  "Real-time admin dashboard",
                  "Role-based access for teams",
                  "Exportable logs for compliance",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex gap-x-[20px] items-start text-[#131212] font-popins text-[18px] md:text-[24px]"
                  >
                    <span className="rounded-full w-[26px] h-[26px]">
                      <IoCheckmarkCircleSharp className="fill-[#52ABFF]" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center md:justify-start mt-10 md:mt-[50px]">
              <Link to="/pricing">
              <button className="px-[35px] h-[60px] md:h-[70px] border border-[#52ABFF] rounded-[18px] font-inter text-[20px] md:text-[24px] bg-[#52ABFF] text-white hover:bg-white hover:text-[#52ABFF] font-semibold transition-all duration-300 cursor-pointer">
                Get Started Now
              </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BusinessSupport;

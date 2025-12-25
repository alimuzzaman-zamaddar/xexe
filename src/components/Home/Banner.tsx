import Container from "../../shared/Container";
import Banimg from "../../assets/images/bannerimg.png";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const Banner = () => {
    useEffect(() => {
    AOS.init({
      duration: 1000, // Set the animation duration (optional)
      easing: 'ease-out', // Set the easing function (optional)
      once: true, // Only animate once when scrolling in
    });
  }, []);
  return (
    <section className="lg:mt-20 mt-10 lg:px-4 px-4">
      <Container>
        <div className="lg:flex justify-between gap-x-[68px] items-stretch">
          <div data-aos="fade-left" className="lg:w-3/5 w-full">
            <h1 className="font-popins xl:text-[64px] lg:text-[40px] text-[25px] lg:text-start text-center  text-[#262C30] font-semibold xl:leading-[84px] lg:leading-[50px] md:leading-[30px]">
              Stop Fraud  <span className="text-[#52ABFF]">Before</span> It Starts
             
            </h1>
            <p className="pt-5 pb-[40px] xl:text-[24px] lg:text-[22px] text-[18px] text-[#313131] font-normal xl:w-[700px] lg:w-[500px] w-full lg:text-start text-center">
              AI-Powered Verification for Documents & Emails Catch tampered contracts, fake senders, and risky attachments in real time — with no IT setup required.
            </p>
            <Link to="/pricing">
            <button className="md:px-[35px] px-[20px] lg:block hidden md:h-[70px] h-[50px] border border-[#52ABFF] rounded-[18px] font-inter lg:text-[24px] text-[20px]  hover:bg-[#FFF] hover:text-[#52ABFF] font-semibold bg-[#52ABFF] text-[#FFF] transition-all duration-300 cursor-pointer">
              Get Started Now
            </button>
            </Link>
          </div>
          <div data-aos="fade-right" className="lg:w-2/5 w-full h-full">
            <figure className="h-full">
              <img
                src={Banimg}
                alt="Banimg"
                className="w-full h-full object-cover"
              />
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;

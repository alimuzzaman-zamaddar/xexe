import img1 from "../../assets/images/Professional.png";
import img2 from "../../assets/images/Man.png";
import img3 from "../../assets/images/women.png";
import { Swiper, SwiperSlide,} from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi"; 

const Authslider = () => {
  const testimonial = [
    {
      message:
        "“Before Xeltra, we nearly signed a contract with a fake vendor. Now, every document and email goes through their system. It’s fast, simple, and has already saved us from a serious mistake.”",
      name: "Julia S., Procurement Manager",
      location: "Berlin, Germany",
      image: img1,
    },
    {
      message:
        "“Xeltra's platform has streamlined our entire supply chain process, saving us time and money. It’s an essential tool for our team.”",
      name: "Michael W., Supply Chain Director",
      location: "London, UK",
      image: img2,
    },
    {
      message:
        "“We’ve been able to significantly reduce errors and improve efficiency. Xeltra’s easy-to-use system has made a huge difference.”",
      name: "Sarah L., Operations Manager",
      location: "New York, USA",
      image: img3,
    },
  ];

  return (
    <div className="relative w-full">
      <h3 className="font-popins font-semibold text-2xl sm:text-3xl xl:text-[44px] text-white text-center">
        What People Are Saying
      </h3>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={20}
        pagination={{
          el: ".custom-swiper-pagination",
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: true, 
        }}
        className="mt-10 sm:mt-16"
      >
        {testimonial.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="p-6 sm:p-8 bg-[#1D4274] rounded-[20px] sm:rounded-[30px]">
              <figure className="w-full flex justify-center">
                <img
                  src={item.image}
                  alt="Signup"
                  className="h-[80px] w-[80px] xl:h-[150px] xl:w-[150px]  rounded-full object-cover"
                />
              </figure>
              <p className="py-6 sm:py-10 font-popins font-medium text-base sm:text-lg lg:text-[20px] text-white text-center sm:text-left">
                {item.message}
              </p>
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-2">
                <h4 className="font-popins text-lg sm:text-xl lg:text-[24px] font-normal text-white">
                  {item.name}
                </h4>
                <h5 className="font-popins text-sm sm:text-base lg:text-[18px] font-normal text-white">
                  {item.location}
                </h5>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper Pagination */}
      <div className="custom-swiper-pagination flex justify-center mt-6 sm:mt-8 gap-2"></div>

      {/* Custom Navigation Arrows with React Icons */}
      <div className="swiper-button-next absolute top-1/2 right-2 z-10 text-white cursor-pointer bg-[#4A90E2] p-1 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
        <FiArrowRight size={20} className="text-white" />
      </div>
      <div className="swiper-button-prev absolute top-1/2 left-2 z-10 text-white cursor-pointer bg-[#4A90E2] p-1 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
        <FiArrowLeft size={20} className="text-white" />
      </div>
    </div>
  );
};

export default Authslider;

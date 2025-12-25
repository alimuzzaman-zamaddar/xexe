import React from "react";
import { useSubscribe } from "../../Services/subscription.hook";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router";

type PricingCardProps = {
  title: string;
  description: string | "";
  price: number | string;
  priceSuffix?: string;
  buttonText: string;
  features: string[];
  supportInfo?: string;
  isCurrent?: boolean;
  extraFeatures?: string[];
};

const Pricingcards: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  priceSuffix = "Month",
  buttonText,
  features,
  supportInfo,
  extraFeatures,
}) => {
    const { mutateAsync: subscribeMutation } = useSubscribe();

    const {user} = useAuth()
    
  const  navigate = useNavigate();
    const handleSubscritption = () => {
  if (!user) {
    navigate("/signup");
    return;
  }

  subscribeMutation({
    slug: title.toLowerCase().replace(/\s+/g, '-').split("-")[0],
    success_redirect_url: window.location.href,
    cancel_redirect_url: window.location.href,
  }).catch((error) => {
    console.error("Subscription error:", error);
  });
};
  
  return (
    <div className="group cursor-pointer mb-5 2xl:mb-0 w-full h-full flex">
      <button
        onClick={handleSubscritption}
        className="xl:px-[35px] px-[10px] xl:py-[35px] py-[10px] border border-[#D7D7D7] rounded-[30px] duration-300 group-hover:bg-[#003072] xl:w-full w-full h-full flex flex-col grow"
      >
        <h4 className="xl:text-[42px] text-[30px] mb-10 font-popins font-semibold text-[#000] group-hover:text-white">
          {title}
        </h4>
        <p className="xl:text-[20px] text-[16px] font-popins text-[#313131] font-normal group-hover:text-[#B9CBE2]">
          {description}
        </p>
        <h5 className="font-semibold text-[#000] font-popins xl:text-[44px] text-[24px] pt-5 xl:pb-20 pb-[30px] flex justify-between items-center group-hover:text-white">
          €{price}{" "}
          <span className="font-popins text-[#313131] font-medium text-right xl:text-[24px] text-[18px] group-hover:text-white">
            {priceSuffix}
          </span>
        </h5>
        <div className="xl:pb-[160px] pb-[50px] border-b border-[#D7D7D7] flex justify-center">
          <button className="border border-[#D7D7D7] rounded-[20px] xl:px-[60px] px-[40px] xl:py-[18px] py-[15px] font-semibold font-popins lg:text-[24px] text-[20px] group-hover:bg-white group-hover:text-[#003072] cursor-pointer">
            {buttonText}
          </button>
        </div>

        <div className="pt-[30px] grow">
          <h3 className="font-semibold text-[#000] font-popins xl:text-[42px] text-[25px] lg:text-start text-center pb-5 group-hover:text-white">
            Features
          </h3>
          <ul className="flex flex-col gap-[20px] group-hover:text-[#fff]">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex gap-x-[20px] text-[#ADADAD] font-popins font-normal text-[18px] items-center"
              >
                <span className="h-4 w-4 rounded-full border border-[#313131] group-hover:border-white flex-shrink-0 inline-block transition-colors duration-300"></span>

                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="xl:min-h-[320px] h-full pt-10">
          <h3 className="font-semibold text-[#000] font-popins lg:text-[42px] text-[30px] lg:text-start text-center group-hover:text-white">
            Support
          </h3>
          <p className="text-[#ADADAD] font-popins font-normal lg:text-[20px] text-[18px] lg:text-start text-center">
            {supportInfo}
          </p>
          {extraFeatures && extraFeatures.length > 0 && (
            <ul className="flex flex-col gap-[20px] group-hover:text-[#B9CBE2]">
              {extraFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex gap-x-[20px] text-[#ADADAD] font-popins font-normal text-[18px] items-center"
                >
                  <span className="h-4 w-4 rounded-full border border-[#313131] group-hover:border-white flex-shrink-0 inline-block transition-colors duration-300"></span>

                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
      </button>
    </div>
  );
};

export default Pricingcards;

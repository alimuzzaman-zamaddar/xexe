import type { ReactNode } from "react";

interface DashboardCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  description: string;
}

const Dashboardcard: React.FC<DashboardCardProps> = ({
  icon,
  title,
  value,
  description,
}) => {
  return (
    <div className="p-5 rounded-[20px] bg-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer">
      <div className="flex flex-col gap-3">
        <div className="bg-[#F9F9F9] h-[62px] w-[62px] rounded-full flex justify-center items-center">
          {icon}
        </div>
        <h4 className="font-popins text-base sm:text-lg md:text-xl font-semibold text-[#111315]">
          {title}
        </h4>
        <h3 className="font-popins text-[32px] sm:text-[36px] md:text-[44px] font-semibold text-[#003072]">
          {value}
        </h3>
        <p className="font-popins text-sm sm:text-base md:text-lg text-[#ADADAD]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Dashboardcard;

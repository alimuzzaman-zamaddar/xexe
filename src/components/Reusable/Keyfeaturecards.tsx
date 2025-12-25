import React from "react";

interface KeyFeatureCardProps {
    title: string;
    description: string;
}

const KeyFeatureCard: React.FC<KeyFeatureCardProps> = ({ title, description }) => {
    return (
        <div className="bg-[#1D4274] p-[30px] rounded-[20px] flex flex-col h-full transform transition-transform duration-300 hover:translate-y-[-10px] cursor-pointer">
            <h4 className="lg:text-[32px] text-[24px] font-popins text-white font-semibold mb-[10px]">
                {title}
            </h4>
            <p className="text-[#B9CBE2] lg:text-[24px] text-[18px] font-normal font-popins">
                {description}
            </p>
        </div>
    );
};

export default KeyFeatureCard;

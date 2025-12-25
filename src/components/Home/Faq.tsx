import React from "react";
import { Collapse } from "antd";
import { FiArrowUpRight } from "react-icons/fi";
import type { CollapseProps } from "antd";
import Container from "../../shared/Container";

const faqItems: CollapseProps["items"] = [
  {
    key: "1",
    label: "Is my data secure when I upload documents or connect email?",
    children: (
      <p className="text-[#ADADAD] text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] leading-[28px] md:leading-[32px] lg:leading-[36px] xl:leading-[40px] font-popins font-normal pr-0 md:pr-[50px] xl:pr-[100px]">
        Absolutely. We use industry-standard encryption and secure
        authentication to protect all user data. Your documents and emails are
        never shared or stored without your permission.
      </p>
    ),
  },
  {
    key: "2",
    label: "What file formats do you support?",
    children: (
      <p className="text-[#ADADAD] text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] leading-[28px] md:leading-[32px] lg:leading-[36px] xl:leading-[40px] font-popins font-normal pr-0 md:pr-[50px] xl:pr-[100px]">
        We currently support PDF and DOCX file formats for document uploads.
        These are the most commonly used formats for contracts, agreements, and
        official communications. Support for additional formats may be added in
        future updates.
      </p>
    ),
  },
  {
    key: "3",
    label: "Can I connect my Gmail or Outlook account?",
    children: (
      <p className="text-[#ADADAD] text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] leading-[28px] md:leading-[32px] lg:leading-[36px] xl:leading-[40px] font-popins font-normal pr-0 md:pr-[50px] xl:pr-[100px]">
        Yes, you can securely connect your Gmail or Outlook account. Once
        connected, our system will scan your emails for suspicious content or
        activity using your permission. We use OAuth for secure login and never
        store your credentials—your privacy and data security are always our top
        priority.
      </p>
    ),
  },
  {
    key: "4",
    label: "How does the fraud detection work?",
    children: (
      <p className="text-[#ADADAD] text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] leading-[28px] md:leading-[32px] lg:leading-[36px] xl:leading-[40px] font-popins font-normal pr-0 md:pr-[50px] xl:pr-[100px]">
        We scan your documents and emails for suspicious keywords, patterns, and
        sender details, then generate a risk score and highlight any red flags.
      </p>
    ),
  },
  {
    key: "5",
    label: "What is a fraud risk score?",
    children: (
      <p className="text-[#ADADAD] text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] leading-[28px] md:leading-[32px] lg:leading-[36px] xl:leading-[40px] font-popins font-normal pr-0 md:pr-[50px] xl:pr-[100px]">
        The fraud risk score is a percentage that shows how likely a document or
        email contains suspicious or risky content, based on our analysis. A
        higher score means more potential red flags were detected.
      </p>
    ),
  },
];

const Faq: React.FC = () => {
  return (
    <section
      className="py-[40px] md:py-[80px] lg:py-[150px] px-4  2xl:px-0 bg-[#fff]"
      id="faq"
    >
      <Container >
        <h3 className="font-popins text-[24px] md:text-[36px] lg:text-[64px] text-[#262C30] font-semibold leading-tight lg:leading-[84px] pb-6 lg:pb-20">
          Frequently Asked <span className="text-[#52ABFF]">Questions</span>
        </h3>

        <div data-aos="fade-up" className="space-y-6">
          <Collapse
            accordion
            items={faqItems}
            expandIconPosition="end"
            expandIcon={({ isActive }) => (
              <FiArrowUpRight
                className={`transform transition-transform duration-700 ease-in-out ${
                  isActive ? "rotate-180" : "rotate-0"
                }`}
                style={{ fontSize: 30, color: "#52ABFF" }}
              />
            )}
            className="faq-custom-collapse"
            bordered={false}
          />
        </div>
      </Container>
    </section>
  );
};

export default Faq;

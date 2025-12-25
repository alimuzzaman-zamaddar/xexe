// import Faq from "../components/Home/Faq";
import Banner from "../components/Pricing/Banner";
import Pricingcards from "../components/Reusable/Pricingcards";
import Container from "../shared/Container";

const features = [
  "Company Verification: Up to 5 verifications per month.",
  "Contract Scans: Analyze up to 10 contracts per month for red flags.",
  "Email Scans: Analyze up to 50 emails per month for phishing and scams.",
  "Risk Scoring: Simple percentage-based risk score for all analyses.",
  "Dashboard Access: Basic dashboard with limited customization.",
  "Reports: Downloadable reports in PDF format.",
];
const features1 = [
  "Company Verification: Up to 20 verifications per month.",
  "Contract Scans: Analyze up to 50 contracts per month.",
  "Advanced Risk Scoring: Detailed risk breakdown with specific red flags.",
  "Custom Dashboard: Customizable interface with more options for data visualization.",
  "Report Export: Export reports in PDF, Excel, or CSV formats.",
  "Alerts: Real-time notifications for high-risk findings.",
];
const features2 = [
  "Unlimited Access: Unlimited company verifications, contract scans, and email scans.",
  "Comprehensive Risk Analysis: Advanced Al tools for predictive analytics and fraud pattern recognition.",
  "Bulk Verification: Analyze up to 50 companies in a single report.",
  "Fully Customizable Dashboard: Advanced data visualization, trends, and historical analysis.",
  "API Access: Seamless integration with CRM, ERP, and other enterprise tools.",
  "Multi-user Accounts: Role-based access for team collaboration.",
];

const Pricing = () => {
  return (
    <section className="lg:pt-[82px] pt-[45px] lg:pb-[120px] pb-[60px] 2xl:px-0 px-4">
      <Container>
        <Banner />
        <div className="pt-[50px] lg:pt-[120px] flex flex-wrap justify-center xl:justify-between gap-6 items-stretch">
          <div className="w-full sm:w-[90%] md:w-[48%] xl:w-[32%] flex">
            <Pricingcards
              title="Basic Plan"
              description=""
              price={90}
              buttonText="Current Plan"
              features={features}
              supportInfo="Email support with a 48-hour response time."
              isCurrent
            />
          </div>
          <div className="w-full sm:w-[90%] md:w-[48%] xl:w-[32%] flex">
            <Pricingcards
              title="Pro plan"
              description=""
              price={250}
              buttonText="Get Advance"
              features={features1}
              supportInfo="Email support with a 48-hour response time."
              isCurrent
            />
          </div>
          <div className="w-full sm:w-[90%] md:w-[48%] xl:w-[32%] flex">
            <Pricingcards
              title="Enterprise Plan"
              description=""
              price={400}
              buttonText="Current plan"
              features={features2}
              isCurrent
              extraFeatures={[
                "Dedicated account manager for personalized assistance.",
                "24/7 phone and email support.",
                "Onboarding training sessions for our team.",
              ]}
            />
          </div>
        </div>
      </Container>
      {/* <Faq /> */}
    </section>
  );
};

export default Pricing;

import Container from "../../shared/Container"
import Keyfeaturecards from "../Reusable/Keyfeaturecards"


const Keyfeatures = () => {
    return (
        <section id="feature" className="bg-[#003072] lg:py-[123px] py-[50px] 2xl:px-0 px-4">
            <Container>
                <h3 className="font-popins font-extrabold text-[#FFF] text-center lg:text-[56px] text-[30px]">Key Features</h3>
                <p className="text-[#fff] text-center lg:text-[24px] text-[18px] font-popins pt-4">Discover the core tools that make our fraud detection platform powerful yet easy to use. </p>
                <div data-aos="slide-left" className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 pt-[66px]">
                    <Keyfeaturecards title="Smart File Upload & Email Parsing" description="Upload PDFs or DOCX files—or connect your email inbox—to instantly scan for potential fraud." />
                    <Keyfeaturecards title="Risk Score & Issue Highlights" description="Get a fraud risk percentage with a detailed breakdown of flagged keywords, red flags, and sender issues in a simple, easy-to-understand report." />
                    <Keyfeaturecards title="End-to-End Data Security" description="Your data is protected with encrypted storage, secure authentication, and strict privacy standards" />
                    <Keyfeaturecards title="Intelligent Text Analysis & Content Scanning" description="It’s designed to identify inconsistencies, potential red flags, so you can make informed decisions before taking action." />
                    <Keyfeaturecards title="Intuitive, Insight-Driven Dashboard" description="Our clean and minimal dashboard helps you track uploaded documents, view analysis history, monitor results." />
                    <Keyfeaturecards title="Ready to Scale with Your Business" description="Designed to grow with your needs, the platform is built to support API integrations, bulk scanning." />
                </div>
            </Container>
        </section>
    )
}

export default Keyfeatures
import Container from "../../shared/Container"


const Banner = () => {
    return (
        <section className="2xl:px-0 px-4">
            <Container>
                <h2 className="font-popins lg:text-[64px] md:text-[35px] text-[25px] text-[#262C30] font-semibold lg:leading-[84px] text-center">
                    Flexible Plans for Every <span className="text-[#52ABFF]">Business</span>  Size
                </h2>
                <p className="pt-5 lg:text-[24px] text-[18px] text-[#313131] font-popins font-normal text-center lg:w-[1000px] w-full mx-auto">
                    Whether you're just getting started or managing large-scale operations, choose the plan that fits your needs. All plans come with secure document scanning, real-time analysis, and dedicated support.
                </p>
            </Container>
        </section>
    )
}

export default Banner
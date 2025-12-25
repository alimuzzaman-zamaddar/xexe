import { useNavigate } from "react-router";
import Container from "../../shared/Container";
import { useFreeTrial } from "../../Services/subscription.hook";
import { useAuth } from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const FreeTrial = () => {
  const { user } = useAuth();
  const { mutate: triggerFreeTrial, isPending } = useFreeTrial();

  const navigate = useNavigate();
  const handleFreeTrial = () => {
    if (!user?.email) {
      navigate("/signup");
      toast.error("You must be logged in to try free trial.");
      return;
    }

    triggerFreeTrial({
      email: user.email,
      success_redirect_url: window.location.href,
      cancel_redirect_url: window.location.href,
    });
  };
  return (
    <section
      id="free-trial"
      className="bg-[#003072] lg:py-[160px] py-[40px] 2xl:px-0 px-4"
    >
      <Container className="xl:flex">
        <div className=" ">
          <h2
            data-aos="fade-up"
            className="font-popins lg:text-[58px] md:text-[35px] text-[25px] text-[#FFF] font-extrabold lg:leading-[84px] "
          >
            Try Xeltra Free for 7 Days
          </h2>
          <p
            data-aos="fade-up"
            className="text-[#CDCDCD] font-popins lg:text-[24px] text-[18px]  font-normal pt-5 pb-[60px]"
          >
            Start your trial and experience real-time protection from document
            fraud, tampering, and phishing.
          </p>

          <div data-aos="fade-up" className="">
            {!user?.isTrial && !user?.isSubscribed ? (
              <button
                onClick={handleFreeTrial}
                disabled={isPending}
                className="px-7 py-[10px] border border-[#52ABFF] rounded-lg font-inter text-[22px] text-[#52ABFF] font-semibold hover:bg-[#52ABFF] hover:text-[#FFF] transition-all duration-300 cursor-pointer"
              >
                {isPending ? "Redirecting..." : "Start Free Trial"}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
                <div className="lg:flex justify-center lg:pb-[120px] pb-12 border-b border-[#3D3D3D]">
          <div className="">
            <h3 className="text-[#FFF] xl:text-[58px] text-[25px] font-popins font-extrabold lg:mt-0 mt-5">
              Join Our Newsletter
            </h3>
            <p className="text-[#CDCDCD] font-popins lg:text-[24px] text-[18px]  font-normal pt-5 pb-[60px]">
              Get occasional updates, product improvements, and fraud prevention
              tips — straight to your inbox.
            </p>
            <div className="flex gap-x-5 relative w-full">
              <input
                type="search"
                placeholder="Email address"
                className="text-[#FFF] lg:text-[24px] text-[18px] font-popins font-normal bg-[#201D1D] w-full px-[30px] py-5 rounded-[10px] border-none outline-0"
              />
              <button className="px-[20px] h-[46px] border border-[#52ABFF] rounded-[10px] font-inter text-[16px] hover:bg-[#FFF] hover:text-[#52ABFF]  font-semibold bg-[#76B6F3] text-[#FFF] transition-all duration-300 cursor-pointer absolute top-1/2 right-5 -translate-y-1/2">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FreeTrial;

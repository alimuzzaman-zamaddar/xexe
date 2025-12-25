import { useForm, type SubmitHandler } from "react-hook-form";
import { Emailicon, Locationicon } from "../assets/icons/Icons";
import Container from "../shared/Container";
import { useContactForm } from "../Services/contact.hook";
import type { ContactFormPayload } from "../Services/contact.api";
import toast from "react-hot-toast";
 // Make sure the correct API function and types are imported

type ContactFormInputs = {
  name: string;
  email: string;
  company: string;
  website: string;
  message: string;
};

const Contact = () => {
  // Set up React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  // Use the custom hook to submit the contact form
  const { mutateAsync: submitForm, isPending ,reset } = useContactForm();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    // Mapping form data to match the API payload structure
    const formPayload: ContactFormPayload = {
      name: data.name,
      email: data.email,
      company_name: data.company,
      company_website: data.website,
      message: data.message,
    };

    // Call the mutation to submit the form data
    try {
      const response = await submitForm(formPayload);
      console.log("Form submitted:", response);
      toast.success("Your message has been sent successfully!");
      reset()
      // You can add a success message or redirect here
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally handle error state (e.g., display a message to the user)
    }
  };

  return (
    <section className="pt-[50px] lg:pt-[140px] pb-[40px] lg:pb-[120px] px-4 2xl:px-0">
      <Container>
        <div className="flex flex-col xl:flex-row gap-8 justify-between">
          {/* Form Section */}
          <div className="w-full xl:w-3/5 p-6 sm:p-8 md:p-10 lg:p-12 border border-[#A9A9A9] rounded-[20px] lg:rounded-[40px]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[30px]">
                {/* Name */}
                <div>
                  <label className="block text-[16px] md:text-[20px] font-semibold text-[#232323] font-popins capitalize pb-2 md:pb-4">
                    Your name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="rounded-[12px] md:rounded-[20px] border border-[#A9A9A9]
                      px-6 py-4 md:px-10 md:py-5 w-full text-[16px] md:text-[18px] text-[#000000] font-popins  "
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[16px] md:text-[20px] font-semibold text-[#232323] font-popins capitalize pb-2 md:pb-4">
                    Your Email
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="rounded-[12px] md:rounded-[20px]  px-6 py-4 md:px-10 md:py-5 w-full text-[16px] md:text-[18px] text-[#000000] font-popins  border border-[#A9A9A9]"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-[16px] md:text-[20px] font-semibold text-[#232323] font-popins capitalize pb-2 md:pb-4">
                    Your company
                  </label>
                  <input
                    type="text"
                    {...register("company", { required: "Company is required" })}
                    className="rounded-[12px] md:rounded-[20px]  px-6 py-4 md:px-10 md:py-5 w-full text-[16px] md:text-[18px] text-[#000000] font-popins  border border-[#A9A9A9]"
                  />
                  {errors.company && (
                    <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
                  )}
                </div>

                {/* Website */}
                <div>
                  <label className="block text-[16px] md:text-[20px] font-semibold text-[#232323] font-popins capitalize pb-2 md:pb-4">
                    Your website
                  </label>
                  <input
                    type="text"
                    {...register("website", { required: "Website is required" })}
                    className="rounded-[12px] md:rounded-[20px]  px-6 py-4 md:px-10 md:py-5 w-full text-[16px] md:text-[18px] text-[#000000] font-popins  border border-[#A9A9A9]"
                  />
                  {errors.website && (
                    <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
                  )}
                </div>

                {/* Message */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[16px] md:text-[20px] font-semibold text-[#232323] font-popins capitalize pb-2 md:pb-4">
                    Leave us a message
                  </label>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    className="h-[160px] md:h-[220px] rounded-[12px] md:rounded-[20px]  px-6 py-4 md:px-10 md:py-5 text-[16px] md:text-[18px] text-[#000000] font-popins  border border-[#A9A9A9] w-full"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 md:px-[45px] h-[55px] md:h-[65px] mt-6 md:mt-[36px] border border-[#A9A9A9] rounded-[12px] md:rounded-[18px] font-inter text-[18px] md:text-[24px] font-semibold bg-[#52ABFF] text-[#FFF] hover:bg-[#FFF] hover:text-[#52ABFF] transition-all duration-300"
                disabled={isPending} // Disable the button while the request is being processed
              >
                {isPending ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="w-full xl:w-1/3 p-6 sm:p-8 md:p-10 border border-[#A9A9A9] rounded-[20px] lg:rounded-[40px]">
            <h3 className="font-popins font-semibold text-[24px] md:text-[32px] text-black pb-10 md:pb-[60px]">
              Contact Information
            </h3>

            {/* Email */}
            <div className="flex gap-4 md:gap-6 items-center">
              <div className="h-16 w-16 md:h-20 md:w-20 border border-[#A9A9A9] rounded-[10px] flex justify-center items-center transition-transform duration-300 hover:scale-110">
                <Emailicon />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-[18px] md:text-[20px] font-semibold text-[#232323] font-popins">
                  Email
                </h4>
                <p className="text-[#313131] font-popins text-[14px] md:text-[16px] underline cursor-pointer">
                  <a href="mailto:support@xeltrasoftware.com">support@xeltrasoftware.com</a>
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex gap-4 md:gap-6 items-center mt-8 md:mt-10">
              <div className="h-16 w-16 md:h-20 md:w-20 border border-[#A9A9A9] rounded-[10px] flex justify-center items-center transition-transform duration-300 hover:scale-110">
                <Locationicon />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-[18px] md:text-[20px] font-semibold text-[#232323] font-popins">
                  Location
                </h4>
                <p className="text-[#313131] font-popins text-[14px] md:text-[16px]">
                  Welserstraße 3, 87463 Dietmannsried, Germany
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;

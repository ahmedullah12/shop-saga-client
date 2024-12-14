import SSForm from "@/components/form/SSForm";
import SSInput from "@/components/form/SSInput";
import { Button } from "@/components/ui/button";
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { TError } from "@/types/global";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [forgetPassword, { isLoading, error }] = useForgetPasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await forgetPassword(data).unwrap();

      if (res.success === true) {
        toast.success(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (error) {
      const err = error as TError;
      if (err.data) {
        toast.error(err.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }, [error]);
  return (
    <div className=" flex justify-center items-center bg-white  relative mt-20">
      <div className="w-full md:w-[500px] px-4">
        <div className="bg-accent rounded-lg px-10 py-5 shadow-lg">
          <h1 className="mb-6 font-semibold text-secondary text-2xl">
            Forget Password
          </h1>

          <SSForm onSubmit={onSubmit}>
            <SSInput
              width="max-w-[400px]"
              name="email"
              type="text"
              label="Email"
            />
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-primary mt-6"
            >
              Submit
            </Button>
          </SSForm>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

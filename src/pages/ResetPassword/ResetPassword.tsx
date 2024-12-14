import SSForm from "@/components/form/SSForm";
import SSInput from "@/components/form/SSInput";
import { Button } from "@/components/ui/button";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { TError } from "@/types/global";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const payload = {
        ...data,
        id: searchParams.get("userId"),
      };

      const res = await resetPassword({
        token: searchParams.get("token"),
        payload,
      }).unwrap();

      if (res.success === true) {
        toast.success(res.message);
        navigate("/login");
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
          <h1 className="mb-6 font-semibold text-secondary text-2xl underline">
            Reset Password
          </h1>

          <SSForm onSubmit={onSubmit}>
            <div className="space-y-5">
              <SSInput
                width="max-w-[300px]"
                name="password"
                type="password"
                label="Password"
              />
            </div>

            <Button
              disabled={isLoading}
              type="submit"
              className="bg-primary block mt-4"
            >
              {isLoading ? "Logging" : "Login"}
            </Button>
          </SSForm>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

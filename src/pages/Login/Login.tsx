import SSForm from "@/components/form/SSForm";
import SSInput from "@/components/form/SSInput";
import { Button } from "@/components/ui/button";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TError } from "@/types/global";
import verifyJwt from "@/utils/verifyJwt";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const [login, { error, isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();

      if (res.success === true) {
        const userData = verifyJwt(res.data.accessToken) as TUser;
        dispatch(setUser({ user: userData, token: res.data.accessToken }));
        toast.success(res.message);
        navigate(from, { replace: true });
        setIsSuccess(true);
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
            Login
          </h1>

          <SSForm onSubmit={onSubmit} isSuccess={isSuccess}>
           <div className="space-y-5">
           <SSInput
              width="max-w-[300px]"
              name="email"
              type="text"
              label="Email"
            />
            <SSInput
              width="max-w-[300px]"
              name="password"
              type="password"
              label="Password"
            />
           </div>

            <Link to={"/forgot-password"}>
              <small className="text-xs hover:underline">
                Forgot Password?
              </small>
            </Link>

            <Button disabled={isLoading} type="submit" className="bg-primary block mt-4">
              {isLoading ? "Logging" : "Login"}
            </Button>
          </SSForm>

          <p className="text-center mt-6 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

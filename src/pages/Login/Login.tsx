import SSForm from "@/components/form/SSForm";
import SSInput from "@/components/form/SSInput";
import { Button } from "@/components/ui/button";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import verifyJwt from "@/utils/verifyJwt";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImage from "../../assets/login.png";

const Login = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [defaultValues, setDefaultValues] = useState<FieldValues>({
    email: "",
    password: "",
  });

  const [login, { isLoading }] = useLoginUserMutation();
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
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleDemoCredentials = (role: "customer" | "vendor" | "admin") => {
    const credentials = {
      customer: { email: "customer@demo.com", password: "customer123" },
      vendor: { email: "vendor@demo.com", password: "vendor123" },
      admin: { email: "admin@demo.com", password: "admin123" },
    };
    setDefaultValues(credentials[role]);
  };

  return (
    <div className="flex justify-center items-center bg-white relative mt-20">
      <div className="flex bg-accent rounded-lg overflow-hidden shadow-lg">
        <div className="w-[500px] h-[450px]">
          <div className="px-10 py-5 h-full">
            <h1 className="mb-2 font-semibold text-secondary text-2xl underline">
              Login
            </h1>

            <div className="mb-6 text-end">
              <p className="font-medium text-gray-700">Demo Credentials</p>
              <div className="flex justify-end gap-4 mt-2 text-sm">
                <button
                  className="font-semibold text-primary"
                  onClick={() => handleDemoCredentials("customer")}
                >
                  Customer
                </button>
                <button
                  className="font-semibold text-primary"
                  onClick={() => handleDemoCredentials("vendor")}
                >
                  Vendor
                </button>
                <button
                  className="font-semibold text-primary"
                  onClick={() => handleDemoCredentials("admin")}
                >
                  Admin
                </button>
              </div>
            </div>

            <SSForm
              onSubmit={onSubmit}
              isSuccess={isSuccess}
              defaultValues={defaultValues}
            >
              <div className="space-y-5">
                <SSInput
                  width="max-w-full"
                  name="email"
                  type="text"
                  label="Email"
                />
                <SSInput
                  width="max-w-full"
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

              <Button
                disabled={isLoading}
                type="submit"
                className="bg-primary block mt-4"
              >
                {isLoading ? "Logging In" : "Login"}
              </Button>
            </SSForm>

            <p className="text-center mt-6 text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary font-medium underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden md:block w-[500px] h-[450px]">
          <img 
            className="w-full h-full object-cover" 
            src={loginImage} 
            alt="login"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

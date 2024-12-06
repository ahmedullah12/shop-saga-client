import SSForm from "@/components/form/SSForm";
import SSInput from "@/components/form/SSInput";
import { SSSelect } from "@/components/form/SSSelect";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCurrentUser, useRegisterMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TError } from "@/types/global";
import verifyJwt from "@/utils/verifyJwt";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const user = useAppSelector(useCurrentUser);

  const roleOptions = [
    { value: "CUSTOMER", label: "Customer" },
    { value: "VENDOR", label: "Vendor" },
  ];

  const [register, { error, isLoading }] = useRegisterMutation();

  
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    formData.append("data", JSON.stringify(data));

    try {
      const res = await register(formData).unwrap();

      if (res.success === true) {
        const userData = verifyJwt(res.data.accessToken) as TUser;
        dispatch(setUser({ user: userData, token: res.data.accessToken }));
        toast.success(res.message);
        navigate("/");
        setIsSuccess(true);
      }
    } catch (err) {
      console.log("Something went wrong!!");
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  console.log(error);

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
    <div className=" flex justify-center items-center bg-white overflow-y-auto relative">
      <div className="w-full md:w-[700px] px-4 mt-16 mb-8">
        <div className="bg-accent shadow-lg rounded-lg px-10 py-8">
          <h1 className="mb-6 font-semibold text-secondary text-2xl underline">
            Create Account
          </h1>

          <SSForm onSubmit={onSubmit} isSuccess={isSuccess}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SSInput
                width="max-w-[300px]"
                name="name"
                type="text"
                label="Name"
              />
              <SSInput
                width="max-w-[300px]"
                name="email"
                type="text"
                label="Email"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SSInput
                width="max-w-[300px]"
                name="password"
                type="password"
                label="Password"
              />
              <SSSelect
                name="role"
                label="Role"
                options={roleOptions}
                placeholder="Select a Role"
                className="max-w-[300px] mb-5"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SSInput
                width="max-w-[300px]"
                name="contactNumber"
                type="text"
                label="Contact Number"
              />
              <div className="min-w-fit mb-5">
                <Label className="text-primary">Profile Image</Label>
                <label
                  className="flex bg-white h-10 w-full ps-3 cursor-pointer items-center justify-start rounded-lg border-2 border-default-200 text-sm text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                  htmlFor="image"
                >
                  {selectedImage ? selectedImage.name : "Profile Image"}
                </label>
                <input
                  className="hidden"
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
            </div>

            <Button disabled={isLoading} className="bg-primary w-full">
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </SSForm>

          <p className="text-center mt-6 text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

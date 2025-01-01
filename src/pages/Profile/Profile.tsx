import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import Loader from "@/components/Loader";
import { useCurrentUser } from "@/redux/features/auth/authApi";
import {
  useGetUserWithEmailQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";

const Profile = () => {
  const user = useAppSelector(useCurrentUser);
  const { data: userData, isLoading } = useGetUserWithEmailQuery(user?.email);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    address: "Your address here",
  });

  const [updateUser, { isLoading: updateUserLoading }] =
    useUpdateUserMutation();

  if (isLoading) return <Loader />;

  const handleEdit = () => {
    setFormData({
      name: userData?.data?.name || "",
      contactNumber: userData?.data?.contactNumber || "",
      address: userData?.data?.address || "",
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
    try {
      const res = await updateUser({
        userId: userData?.data?.id,
        payload: formData,
      }).unwrap();
      if (res.success === true) {
        toast.success(res.message);
        setIsEditing(false);
      }
    } catch (err: any) {
      toast.error(err.data.message);
      console.log(err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-48 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        <div className="absolute inset-0 bg-white/10"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="relative -mt-20">
          <div className="bg-white shadow-sm rounded-lg p-8">
            <div className="flex justify-end mb-6">
              {!isEditing && <Button onClick={handleEdit}>Edit Profile</Button>}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/4">
                  <div className="flex flex-col items-center md:items-start">
                    {userData?.data?.profileImage ? (
                      <img
                        src={userData.data.profileImage}
                        alt={userData.data.name}
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center">
                        <User size={48} className="text-gray-400" />
                      </div>
                    )}
                    <h1 className="mt-4 text-2xl font-bold text-gray-900">
                      {userData?.data?.name}
                    </h1>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mt-2">
                      {userData?.data?.status}
                    </span>
                  </div>
                </div>

                <div className="md:w-3/4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User size={20} />
                        <span className="font-medium">Full Name</span>
                      </div>
                      {isEditing ? (
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full"
                        />
                      ) : (
                        <p className="text-lg text-gray-900">
                          {userData?.data?.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={20} />
                        <span className="font-medium">Email Address</span>
                      </div>
                      <p className="text-lg text-gray-900">
                        {userData?.data?.email}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={20} />
                        <span className="font-medium">Phone Number</span>
                      </div>
                      {isEditing ? (
                        <Input
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          className="w-full"
                        />
                      ) : (
                        <p className="text-lg text-gray-900">
                          {userData?.data?.contactNumber}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={20} />
                        <span className="font-medium">Address</span>
                      </div>
                      {isEditing ? (
                        <Input
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full"
                        />
                      ) : (
                        <p className="text-lg text-gray-900">
                          {userData?.data?.address}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={20} />
                        <span className="font-medium">Member Since</span>
                      </div>
                      <p className="text-lg text-gray-900">
                        {formatDate(userData?.data?.createdAt)}
                      </p>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-4 justify-end mt-8">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={updateUserLoading}>
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

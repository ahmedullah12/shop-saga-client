import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useSuspendUserMutation,
} from "@/redux/features/user/userApi";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IUserData } from "@/types/global";
import { Button } from "@/components/ui/button";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import toast from "react-hot-toast";

const AllUsers = () => {
  const [selectedUser, setSelectedUser] = useState<IUserData | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;

  const { data: usersData, isLoading } = useGetAllUsersQuery({
    page: currentPage,
    limit: dataPerPage,
  });

  const [deleteUser] = useDeleteUserMutation();
  const [suspendUser] = useSuspendUserMutation();

  console.log(usersData);

  const handleOpenDeleteModal = (user: IUserData) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      return deleteUser(selectedUser.id).unwrap();
    }
  };

  const handleSuspendUser = async (userId: string) => {
    const res = await suspendUser(userId).unwrap();

    if (res.success === true) {
      toast.success(res.data.message);
    }
  };

  if (isLoading) return <Loader />;

  const users = usersData?.data?.data;
  const meta = usersData?.data?.meta;
  const totalPages = Math.ceil(meta?.total / dataPerPage);

  return (
    <>
      <Card className="w-full max-w-6xl mx-auto my-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user: IUserData) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell className="space-x-3">
                    <Button
                      onClick={() => handleSuspendUser(user.id)}
                      disabled={user.status === "DELETED"}
                      size={"sm"}
                    >
                      {user.status === "SUSPENDED" ? "Reactivate" : "Suspend"}
                    </Button>
                    <Button
                      size={"sm"}
                      variant={"destructive"}
                      onClick={() => handleOpenDeleteModal(user)}
                      disabled={user.status === "DELETED"}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onOpenChange={setIsDeleteModalOpen}
            onDelete={handleDeleteUser}
            title="Delete User"
            description="Are you sure you want to delete this user?"
          />

          {(!users || users.length === 0) && (
            <div className="text-center text-gray-500 py-4">
              No order history found.
            </div>
          )}
        </CardContent>
      </Card>

      {meta?.total > dataPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default AllUsers;

import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import { useGetAllSubscribeUsersQuery } from "@/redux/features/user/userApi";
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
import { ISubscribeUser } from "@/types/global";
import { format } from "date-fns";

const SubscribedUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;

  const { data: usersData, isLoading } = useGetAllSubscribeUsersQuery({
    page: currentPage,
    limit: dataPerPage,
  });

  if (isLoading) return <Loader />;

  const users = usersData?.data?.data;
  const meta = usersData?.data?.meta;
  const totalPages = Math.ceil(meta?.total / dataPerPage);

  return (
    <>
      <Card className="w-full max-w-6xl mx-auto my-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Subscribed Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Subscribe Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user: ISubscribeUser) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{format(user.createdAt, "PPP")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {(!users || users.length === 0) && (
            <div className="text-center text-gray-500 py-4">
              No users found.
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

export default SubscribedUsers;

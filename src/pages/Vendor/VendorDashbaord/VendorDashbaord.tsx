import Loader from "@/components/Loader";
import SalesChart from "@/components/SalesChart";
import { useGetVendorOverviewDataQuery } from "@/redux/features/dashboard-overview/dashboardOverviewApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IProduct } from "@/types/global";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authApi";
import { useGetUserWithEmailQuery } from "@/redux/features/user/userApi";

const VendorDashboard = () => {
  const user = useAppSelector(useCurrentUser);

  const { data: userData, isLoading: userLoading } = useGetUserWithEmailQuery(
    user?.email
  );
  const { data: dashboardOverviewData, isLoading } =
    useGetVendorOverviewDataQuery(userData?.data?.id);

  if (isLoading || userLoading) return <Loader />;
  return (
    <div className="my-6">
      <h1 className="text-2xl font-bold text-primary">Dashboard</h1>

      <div className="my-6">
        <h2 className="text-xl font-bold text-primary mb-3">Overview</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="bg-white p-4 rounded-md shadow-md hover:scale-105 transition-transform">
            <h3 className=" font-bold text-primary">Total Products</h3>
            <p className="text-2xl font-bold text-primary">
              {dashboardOverviewData?.data?.totalProducts}
            </p>
          </div>

          <div className="bg-white p-4 rounded-md shadow-md hover:scale-105 transition-transform">
            <h3 className=" font-bold text-primary">Total Orders</h3>
            <p className="text-2xl font-bold text-primary">
              {dashboardOverviewData?.data?.totalOrders}
            </p>
          </div>

          <div className="bg-white p-4 rounded-md shadow-md hover:scale-105 transition-transform">
            <h3 className=" font-bold text-primary">Total Reviews</h3>
            <p className="text-2xl font-bold text-primary">
              {dashboardOverviewData?.data?.totalReviews}
            </p>
          </div>
        </div>
      </div>
      <div className="my-6">
        <SalesChart salesData={dashboardOverviewData?.data?.salesData} />
      </div>

      <div className="my-6">
        <Card className="max-w-[500px]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary">
              Recent Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardOverviewData?.data?.recentProducts?.map(
                  (product: IProduct) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>${product.price}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorDashboard;

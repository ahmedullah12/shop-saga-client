import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useBlacklistShopMutation,
  useGetAllShopQuery,
} from "@/redux/features/shop/shopApi";
import { IShop } from "@/types/global";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;

  const { data: shopData, isLoading } = useGetAllShopQuery({
    page: currentPage,
    limit: dataPerPage,
  });

  const [blacklistShop] = useBlacklistShopMutation();
  
  const handleBlacklistShop = async (shopId: string) => {
    const res = await blacklistShop(shopId).unwrap();

    if (res.success === true) {
      toast.success(res.data.message);
    }
  };

  if (isLoading) return <Loader />;

  const shops = shopData?.data?.data;
  const meta = shopData?.data?.meta;
  const totalPages = Math.ceil(meta?.total / dataPerPage);

  return (
    <>
      <Card className="w-full max-w-6xl mx-auto my-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            All Shops
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Vendor Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shops?.map((shop: IShop) => (
                <TableRow key={shop.id}>
                  <TableCell className="font-medium hover:underline">
                    <Link to={`/shop/${shop.id}`}>{shop.name}</Link>
                  </TableCell>
                  <TableCell>{shop.vendor.name}</TableCell>
                  <TableCell>{shop.vendor.email}</TableCell>
                  <TableCell>{shop.status}</TableCell>
                  <TableCell className="space-x-3">
                    <Button
                      onClick={() => handleBlacklistShop(shop.id)}
                      size={"sm"}
                    >
                      {shop.status === "BLACKLISTED"
                        ? "Blacklisted"
                        : "BlackList"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {(!shops || shops.length === 0) && (
            <div className="text-center text-gray-500 py-4">
              No shops found.
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

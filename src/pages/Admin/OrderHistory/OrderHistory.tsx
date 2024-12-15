import Loader from "@/components/Loader";
import { useGetAllPaymentsQuery } from "@/redux/features/payment/paymentApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPayment, IPaymentProduct } from "@/types/global";
import formatDate from "@/utils/formatDate";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Pagination from "@/components/Pagination";

const trimText = (text: string, maxLength: number = 20) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const productDetails = (products: IPaymentProduct[]) => {
  return products.map((product) => (
    <div
      key={product.id}
      className="text-sm text-gray-600 flex items-center justify-between mb-2"
    >
      <div className="flex flex-col">
        <span className="font-medium">
          {trimText(product.product?.name || "Unknown Product")}
        </span>
        <span className="text-xs text-gray-500">
          Qty: {product.quantity} @ ${product.price.toFixed(2)}
        </span>
      </div>
    </div>
  ));
};

const OrderHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 4;

  const { data: ordersData, isLoading } = useGetAllPaymentsQuery({
    page: currentPage,
    limit: dataPerPage,
  });

  console.log(ordersData);

  if (isLoading) return <Loader />;

  const orders = ordersData?.data?.data;
  const meta = ordersData?.data?.meta;
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
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Products</TableHead>
                <TableHead className="text-right">Total Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((payment: IPayment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">
                    {payment.transactionId}
                  </TableCell>
                  <TableCell>{formatDate(payment.paymentDate)}</TableCell>
                  <TableCell>{productDetails(payment.products)}</TableCell>
                  <TableCell className="text-right">
                    ${payment.totalPrice.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        payment.status === "COMPLETED"
                          ? "text-green-600 border-green-600"
                          : "text-red-600 border-red-600"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {(!ordersData?.data || ordersData.data.length === 0) && (
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

export default OrderHistory;

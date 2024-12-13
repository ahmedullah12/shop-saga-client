import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Edit2, MoreVertical, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetUserShopQuery } from "@/redux/features/shop/shopApi";
import {
  useDeleteProductMutation,
  useDuplicateProductMutation,
  useGetVendorProductsQuery,
} from "@/redux/features/product/productApi";
import toast from "react-hot-toast";
import { IProduct } from "@/types/global";
import { Link, useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";

const VendorAllProducts = () => {
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 8;

  const { data: shopData, isLoading } = useGetUserShopQuery(undefined);

  const { data: productsData, isLoading: productsLoading } =
    useGetVendorProductsQuery({
      shopId: shopData?.data.id,
      page: currentPage,
      limit: dataPerPage,
    });

  console.log(productsData);
  const navigate = useNavigate();

  const [deleteProduct] = useDeleteProductMutation();
  const [duplicateProduct] = useDuplicateProductMutation();

  const handleDelete = async (productId: string) => {
    const res = await deleteProduct(productId).unwrap();

    if (res.success === true) {
      toast.success(res.message);
      setDeleteConfirmation(null);
    }
  };

  const handleDuplicate = async (productId: string) => {
    const res = await duplicateProduct(productId).unwrap();

    if (res.success === true) {
      toast.success(res.message);
      navigate(`/dashboard/vendor/update-product/${res.data.id}`);
    }
  };

  const handleEdit = (product: IProduct) => {
    navigate(`/dashboard/vendor/update-product/${product.id}`);
  };

  if (isLoading && productsLoading) return <Loader />;

  const products = productsData?.data?.data || [];
  const meta = productsData?.data?.meta;
  const totalPages = Math.ceil(meta?.total / dataPerPage);

  return (
    <div className="w-full p-6 bg-white shadow-sm rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Products</h2>
        <Link to="/dashboard/vendor/add-product">
          <Button size={"sm"} variant="default">
            Add Product
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No products found</p>
          <p className="text-sm">Start by adding your first product</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product: IProduct) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium hover:underline">
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </TableCell>
                <TableCell>
                  {product?.isFlashSale ? (
                    <div>
                      <span className="line-through text-gray-400 mr-2">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-green-600 font-bold">
                        ${product?.flashSalePrice?.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    `$${product.price.toFixed(2)}`
                  )}
                </TableCell>
                <TableCell>{product.inventoryCount}</TableCell>
                <TableCell>
                  <Badge
                    variant={product.isFlashSale ? "destructive" : "secondary"}
                  >
                    {product.isFlashSale ? "Flash Sale" : "Regular"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={() => handleEdit(product)}
                      >
                        <Edit2 className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={() => handleDuplicate(product?.id)}
                      >
                        <Copy className="mr-2 h-4 w-4" /> Duplicate
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => {
                              e.preventDefault();
                              setDeleteConfirmation(product.id);
                            }}
                            className="text-red-600 cursor-pointer"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        {deleteConfirmation === product.id && (
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the "{product.name}" product.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(product.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        )}
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {meta?.total > dataPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default VendorAllProducts;

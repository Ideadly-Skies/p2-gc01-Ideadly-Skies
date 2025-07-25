// src/pages/AdminDashboard.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, deleteProduct as deleteProductReducer } from "../redux/features/products/productSlice";
import { useNavigate } from "react-router";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import { FaPlusCircle, FaBars } from "react-icons/fa";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  async function deleteProduct(id) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to see this product!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteProductReducer(id));
          Swal.fire({
            title: "Deleted!",
            text: `Product ${id} has been successfully deleted.`,
            icon: "success"
          });
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `${error.code} - ${error.message}`,
      });
    }
  }

  return (
    <div className="min-h-screen flex">
        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-10 overflow-y-auto">
            <div className="flex justify-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center">Product Management</h1>
            </div>


            {isLoading && (
                <p className="text-center text-gray-500 text-lg">Loading...</p>
            )}

            {error && (
                <p className="text-center text-red-500 text-lg">Error loading products.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 transition duration-300"
                    >
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-48 w-full object-contain p-4 bg-gray-50 rounded-t-lg"
                    />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-1 truncate">{product.name}</h2>
                        <p className="text-sm text-gray-600 mb-3">ID: {product.id}</p>
                        <p className="text-blue-600 font-bold text-xl mb-4">Rp {product.price.toLocaleString("id-ID")}</p>
                        <div className="flex gap-4">
                        <button
                            title="Edit Product"
                            onClick={() => navigate(`/products/edit/${product.id}`)}
                            className="flex-1 text-center bg-indigo-100 text-indigo-700 py-2 rounded hover:bg-indigo-200"
                        >
                            <PencilSquareIcon className="h-5 w-5 inline" /> Edit
                        </button>
                        <button
                            title="Delete Product"
                            onClick={() => deleteProduct(product.id)}
                            className="flex-1 text-center bg-red-100 text-red-700 py-2 rounded hover:bg-red-200"
                        >
                            <TrashIcon className="h-5 w-5 inline" /> Delete
                        </button>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        </main>
    </div>
  );
}

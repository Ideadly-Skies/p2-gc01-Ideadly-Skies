import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, deleteProduct as deleteProductReducer } from "../redux/features/products/productSlice";
import { useNavigate } from "react-router";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Swal from 'sweetalert2'

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, isLoading, error } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // delete product
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
                    dispatch(deleteProductReducer(id))
                    Swal.fire({
                        title: "Deleted!",
                        text: `product ${id} have been successfully deleted.`,
                        icon: "success"
                    });
                }
            });
        } catch (error) {
            console.log(error)
        }
    }
  
    return (
        <div className="min-h-screen bg-white py-10 px-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Featured Products</h1>
                <button
                    onClick={() => navigate("/products/add")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all duration-300"
                >
                    + Add Product
                </button>
            </div> 


            {isLoading && (
                <p className="text-center text-gray-500 text-lg">Loading...</p>
            )}

            {error && (
                <p className="text-center text-red-500 text-lg">Error loading products.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {products.map((product) => (
                <div
                    key={product.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg border border-gray-200 transition duration-300"
                >
                    <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-56 w-full object-contain p-4 bg-gray-50"
                    />

                    <div className="p-4 flex justify-between items-start gap-2">
                    <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                            <h2 className="text-md font-semibold text-gray-900 line-clamp-2">{product.name}</h2>
                            <div className="flex gap-2">
                                <button
                                title="Edit Product"
                                onClick={() => navigate(`/products/edit/${product.id}`)}
                                className="text-indigo-600 hover:text-indigo-800"
                                >
                                <PencilSquareIcon className="h-5 w-5" />
                                </button>
                                <button
                                title="Delete Product"
                                onClick={() => deleteProduct(product.id)}
                                className="text-red-500 hover:text-red-700"
                                >
                                <TrashIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <p className="text-blue-600 font-bold mt-1">
                        Rp {product.price.toLocaleString("id-ID")}
                        </p>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
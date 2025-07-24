import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/features/products/productSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Featured Products</h1>

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
            onClick={() => navigate(`/products/edit/${product.id}`)}
            className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg border border-gray-200 transition duration-300"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-56 w-full object-contain p-4 bg-gray-50"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{product.name}</h2>
              <p className="text-blue-600 font-bold mt-1">
                Rp {product.price.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

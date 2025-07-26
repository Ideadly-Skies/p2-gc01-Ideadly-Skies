import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/features/products/productSlice";
import Swal from "sweetalert2";
import UploadWidget from "../components/UploadWidget";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submitProduct(e) {
    e.preventDefault();
    try {
      const product = { name, imageUrl, price };
      dispatch(addProduct(product));
      navigate("/");
      Swal.fire({
        text: `product ${name} have been successfully added.`,
        icon: "success"
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `${error.code} - ${error.message}`,
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Product</h1>
        <form onSubmit={submitProduct} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. ASUS ROG Strix G16"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="use the widget below to upload image..."
              required
              disabled={true}
            />
            <UploadWidget setImageUrl={setImageUrl}/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                const val = e.target.value;
                setPrice(val === "" ? "" : +val);
              }}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. 24000000"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

import { doc, getDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { editProductById } from "../redux/features/products/productSlice";
import Swal from "sweetalert2";

export default function EditProduct() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  async function editProduct(e) {
    e.preventDefault();
    try {
      dispatch(editProductById({ id, name, imageUrl, price }));
      navigate("/");
      Swal.fire({
        icon: "success",
        text: `product ${id} have been successfully edited.`
      }); 
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `${error.code} - ${error.message}`,
      });
    }
  }

  useEffect(() => {
    async function getProductById(id) {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const product = docSnap.data();
          setName(product.name);
          setImageUrl(product.imageUrl);
          setPrice(product.price);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: `${error.code} - ${error.message}`,
        });
      }
    }
    getProductById(id);
  }, [id]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8 flex flex-col md:flex-row gap-8 items-start">
        {/* Image Preview */}
        <div className="w-full md:w-1/2 flex justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full max-h-96 object-contain border border-gray-200 rounded-lg"
            />
          ) : (
            <div className="text-gray-400 italic">No image preview</div>
          )}
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Edit Product
          </h1>
          <form onSubmit={editProduct} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

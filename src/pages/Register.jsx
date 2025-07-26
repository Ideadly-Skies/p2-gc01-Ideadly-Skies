import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../configs/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ekLogo from "../assets/enterkomputer.png";
import Swal from "sweetalert2";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, { displayName: name });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        phone,
        createdAt: new Date(),
      });

      navigate("/");

      Swal.fire({
        icon: "success", 
        text: `user ${email} successfully registered!`
      });
    } 
    catch (error) {
      Swal.fire({
        icon: "error",
        text: `${error.code} - ${error.message}`,
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-xl p-10 border-t-[6px] border-green-600">
        <div className="flex justify-center mb-4">
          <img src={ekLogo} alt="EK Logo" className="h-20" />
        </div>
        <h2 className="text-center font-semibold text-gray-800 mb-6">
          Buat akun Enterkomputer
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Nama Pengguna"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="tel"
            placeholder="No Handphone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="password"
            placeholder="Ulangi Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 font-semibold rounded-md transition"
          >
            Daftar
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          sudah punya akun?{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline font-medium">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

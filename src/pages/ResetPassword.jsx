import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../configs/firebase";
import { Link } from "react-router-dom";
import ekLogo from "../assets/enterkomputer.png";
import Swal from "sweetalert2";

function ResetPassword() {
  const [email, setEmail] = useState("");

  async function handleReset(e) {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: "success",
        title: "Link Terkirim!",
        text: `Periksa email Anda (${email}) untuk mereset password.`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `${error.code} - ${error.message}`,
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-sm p-8 border-t-[6px] border-green-600">
        <div className="flex justify-center mb-4">
          <img src={ekLogo} alt="EK Logo" className="w-24 h-24" />
        </div>
        <h2 className="text-center font-medium text-gray-800 mb-6">
          Reset Password Akun Enterkomputer Anda
        </h2>
        <form onSubmit={handleReset} className="space-y-5">
          <input
            type="email"
            placeholder="Username or email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition"
          >
            Reset Password
          </button>
        </form>
        <p className="text-sm text-center mt-6 text-gray-600">
          Ingat password Anda?{" "}
          <Link to="/auth/login" className="text-blue-600 font-medium hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;

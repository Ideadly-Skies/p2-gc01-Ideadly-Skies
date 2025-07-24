import { useState } from "react";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import googleLogo from "../assets/google.png";
import ekLogo from "../assets/enterkomputer.png"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const userLoggedIn = await signInWithEmailAndPassword(auth, email, password);
      console.log(userLoggedIn);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  }

  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google sign-in successful:", result.user);
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-sm p-8 border-t-[6px] border-green-600">
        <div className="flex justify-center mb-4">
          <img src={ekLogo} alt="EK Logo" className="w-24 h-24" />
        </div>
        <h2 className="text-center font-medium text-gray-800 mb-6">
          Masuk ke akun Enterkomputer anda
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 pr-20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
            <Link
              to="/auth/forgot"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 text-sm hover:underline"
            >
              Forgot?
            </Link>
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition"
          >
            Login
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full mt-4 border border-gray-300 rounded-md flex items-center justify-center gap-2 py-2 hover:bg-gray-100 transition"
        >
          <img src={googleLogo} alt="Google" className="w-5 h-5" />
          <span className="text-sm text-gray-700">Login with Google</span>
        </button>

        <p className="text-sm text-center mt-6 text-gray-600">
          Belum punya akun?{" "}
          <Link to="/auth/register" className="text-blue-600 font-medium hover:underline">
            Daftar
          </Link>{" "}
          atau{" "}
          <Link to="/auth/reset" className="text-blue-600 font-medium hover:underline">
            Reset Password
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

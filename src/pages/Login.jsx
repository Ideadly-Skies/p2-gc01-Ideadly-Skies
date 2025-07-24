import { useState } from "react";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom"; 

// sign-in with google
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import googleLogo from "../assets/google.png";

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">🔐 Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 w-full justify-center hover:bg-gray-100 transition"
          >
            <img src={googleLogo} alt="Google logo" className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-700">Login with Google</span>
          </button>
        </div>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router";

function Home() {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await signOut(auth);
            navigate("/auth/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-md text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">👋 Welcome to the Home Page</h1>
                <p className="text-gray-600 mb-8">
                    You are logged in. Feel free to explore or logout when you're done.
                </p>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Home;
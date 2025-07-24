import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebase";
import { FaBars, FaUser } from "react-icons/fa";
import Footer from "../components/Footer";

function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoginPage = location.pathname === "/auth/login";

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/");
            }
        });
    }, []);

    const handleNavigate = () => {
        navigate(isLoginPage ? "/auth/register" : "/auth/login");
    };

    return (
        <>
            <header className="bg-white shadow-md py-4 px-4">
                <div className="max-w-screen-xl mx-auto w-full flex items-center justify-between">
                    {/* Left: Hamburger + Logo */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <FaBars className="text-green-600 text-2xl cursor-pointer" />
                        <img
                            src="https://enterkomputer.com/assets/img/logo/enterkomputer-logo.png?V1.1.5"
                            alt="EnterKomputer Logo"
                            className="h-10 object-contain"
                        />
                    </div>

                    {/* Right: User Icon + Register/Login Toggle */}
                    <div className="flex flex-col items-center text-sm">
                        <FaUser className="text-pink-800 text-2xl mb-1" />
                        <button
                            onClick={handleNavigate}
                            className="text-[13px] font-medium text-blue-600 hover:text-blue-800 transition"
                        >
                            {isLoginPage ? "Register" : "Login"}
                        </button>
                    </div>
                </div>
            </header>

            <Outlet />

            <Footer />
        </>
    );
}

export default AdminLayout;

import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebase";
import { FaBars, FaUser } from "react-icons/fa";
import Footer from "../components/Footer";

import enterKomputerLogo from "../assets/enterkomputer-logo.png"
import Swal from "sweetalert2";

function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoginPage = location.pathname === "/auth/login";

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                Swal.fire({
                    icon: "error",
                    text: `You're already logged in as ${user.email}`,
                });
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
                            src={enterKomputerLogo}
                            alt="EnterKomputer Logo"
                            className="h-10 object-contain"
                        />
                    </div>

                    {/* Right: User Icon + Register/Login Toggle */}
                    <div className="flex flex-col items-center text-sm">
                        <FaUser className="text-emerald-600 text-2xl mb-1" />
                        <button
                            onClick={handleNavigate}
                            className="text-[13px] font-medium text-green-600 hover:text-green-800 transition"
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

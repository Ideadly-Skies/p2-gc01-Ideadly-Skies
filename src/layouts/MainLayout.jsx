import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import { FaBars, FaSearch, FaUser, FaDesktop } from "react-icons/fa";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

import enterKomputerLogo from "../assets/enterkomputer-logo.png"

function MainLayout() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            if (!currentUser) {
                Swal.fire({
                    icon: "error",
                    text: "You need to log-in first!",
                });
                navigate("/auth/login");
            } else {
                setUser(currentUser);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate("/auth/login");
        } catch (err) {
            console.error("Sign out failed:", err);
        }
    };

    return (
        <>
            <header className="bg-white shadow-md py-4 px-4">
                <div className="max-w-screen-xl mx-auto w-full flex items-center justify-around gap-x-6">
                    {/* Left: Hamburger + Logo */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <FaBars className="text-green-600 text-2xl cursor-pointer" />
                        <img
                            src={enterKomputerLogo}
                            alt="EnterKomputer Logo"
                            className="h-10 object-contain"
                        />
                    </div>

                    {/* Center: Search Bar */}
                    <div className="flex items-center flex-grow mx-6">
                        <input
                            type="text"
                            placeholder="Cari PC Gaming"
                            className="w-full border-2 border-green-500 rounded-md px-4 py-2 text-sm focus:outline-none"
                        />
                        <button className="ml-2 text-green-600">
                            <FaSearch className="text-2xl" />
                        </button>
                    </div>

                    {/* Right: PC Icon + Auth UI */}
                    <div className="flex items-center gap-6 flex-shrink-0 ml-4">
                        {/* RAKIT PC with animation */}
                        <div className="flex items-center gap-2 text-purple-700">
                            <span className="font-bold text-xs animate-pulse tracking-wide">RAKIT PC</span>
                            <FaDesktop className="text-2xl" />
                        </div>

                        {/* Auth UI */}
                        {user ? (
                            <div className="flex flex-col items-center text-sm">
                                <FaUser className="text-pink-800 text-2xl mb-1" />
                                <button
                                    onClick={handleSignOut}
                                    className="text-[13px] font-medium text-red-600 hover:text-red-800 transition"
                                >
                                    Sign out
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-sm">
                                <FaUser className="text-pink-800 text-2xl mb-1" />
                                <span className="leading-tight text-[13px] text-gray-800 text-center">
                                    Masuk<br />Daftar
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </header>
 
            <Outlet />

            <Footer/>
        </>
    );
}

export default MainLayout;
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebase";

function AdminLayout() {
    const navigate = useNavigate();
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user)
            if (user) {
                navigate('/')
            }
        });
    }, [])

    return (
            <>
                <header>-- Admin Side --</header>
                <Outlet/>
            </>
        )
}

export default AdminLayout
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebase";

function MainLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user)
            if (!user) {
                navigate('/auth/login');
            }
        });
    }, []) 
    
    return (
        <>
            <div>-- MainLayout --</div>
            <Outlet/>
        </>
    )
}

export default MainLayout
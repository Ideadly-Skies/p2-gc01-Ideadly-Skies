import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AdminLayout from "./layouts/AdminLayout"
import MainLayout from "./layouts/MainLayout"
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

// CRUD Pages
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import ResetPassword from './pages/ResetPassword'

// create routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        index: true,
        element: <Home/>  
      },
      {
        path: "products/edit/:id",
        element: <EditProduct/> 
      },
      {
        path: "products/add",
        element: <AddProduct/> 
      }
    ],
  },
  {
    path: "/auth",
    element: <AdminLayout />, 
    children: [
      {
        path: "login",
        // displayed in outlet
        element: <Login /> 
      },
      {
        path: "register",
        // displayed in outlet
        element: <Register /> 
      },
      {
        path: "reset",
        element: <ResetPassword />
      }
    ],
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
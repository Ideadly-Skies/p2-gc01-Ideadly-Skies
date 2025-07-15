import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AdminLayout from "./layouts/AdminLayout"
import MainLayout from "./layouts/MainLayout"
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

// create routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        index: true,
        element: <Home />   
      }
    ],
  },
  {
    path: "/auth",
    element: <AdminLayout />, 
    children: [
      {
        index: true,
        path: "login",
        // displayed in outlet
        element: <Login /> 
      },
      {
        path: "register",
        // displayed in outlet
        element: <Register /> 
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
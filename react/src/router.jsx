import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Users from './pages/Users';
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./pages/Dashboard";

const routes = [
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
      
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/login",
                element: <Login />,
            }
        ]
    },
 

    {
        path: '*',
        element: <NotFound/>
    }
];

const router = createBrowserRouter(routes);

export default router;

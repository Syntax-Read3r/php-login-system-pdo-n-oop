import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/Users";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./pages/Dashboard";
import UserForm from "./pages/UserForm";

const routes = [
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/users" />,
            },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/users/:id",
                element: <UserForm key="userUpdate"/>,
            },
            // Because I am using the same component on two different routes, :NOTE I must and will specify key to  differentiate
            {
                path: "/users/new",
                element: <UserForm key="userCreate"/>,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
];

const router = createBrowserRouter(routes);

export default router;

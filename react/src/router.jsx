import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Users from './pages/Users';
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

const routes = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/users",
        element: <Users />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: '*',
        element: <NotFound/>
    }
];

const router = createBrowserRouter(routes);

export default router;

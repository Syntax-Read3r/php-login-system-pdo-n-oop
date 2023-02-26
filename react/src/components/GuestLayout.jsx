import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
    const { token } = useStateContext();

    // if the user is authenticated and tries to access one of the pages reserved for guest only. The user is to be redirected to home
    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                For guest users only
                <Outlet />
            </div>
        </div>
    );
}

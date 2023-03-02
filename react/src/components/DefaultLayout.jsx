import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
    // take out the setUser from the stateContext
    const { user, token, setUser, setToken } = useStateContext();

    // check if the token not exist --  If it does not exist. The user does not have permission to access the page and is redirected to login page.
    // Anything that is part of the defaultLayout cannot be accessed if (!token)
    if (!token) {
        return <Navigate to="/login" />;
    }

    // this triggers logouts
    const onLogout = (e) => {
        e.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };
    // this set name of user in react from axiosClient
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>

            <div className="content">
                {/* HTML begins here */}
                <header>
                    <div>Header</div>

                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

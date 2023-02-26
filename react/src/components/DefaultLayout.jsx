import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
    const { user, token } = useStateContext();

    // check if the token not exist --  If it does not exist. The user does not have permission to access the page and is redirected to login page.
    // Anything that is part of the defaultLayout cannot be accessed if (!token)
    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (e) => {
      return e.preventDefault();
    }

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

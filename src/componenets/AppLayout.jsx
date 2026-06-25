import { Outlet, useNavigate } from "react-router-dom";
import "../styles/layout.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import SideBar from "./dashboard/SideBar";

export default function AppLayout() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useContext(AuthContext)
    const showSidebar = isAuthenticated;

    const handleSignupClick = () => {
        navigate("/signup");
    }

    const handleLoginClick = () => {
        navigate("/login");
    }

    const handleLogoutClick = () => {
        logout();
        navigate("/");
    }

    return (
        <div className="app-container">

            {/* HEADER (always visible) */}
            <header className="navbar">
                <div className="logo">ExpenseTrackr</div>

                <div className="nav-actions">
                    {
                        !isAuthenticated &&
                        <button className="btn ghost" onClick={handleLoginClick}>Login</button>
                    }
                    {
                        isAuthenticated ? <button className="btn primary" style={{ background: "red" }} onClick={handleLogoutClick}>Log out</button>
                            : <button className="btn primary" style={{ background: isAuthenticated ? "red" : null }} onClick={handleSignupClick}>Sign Up</button>
                    }
                </div>
            </header>

            {showSidebar && <SideBar />}

            {/* PAGE CONTENT CHANGES HERE */}
            <main className={`content ${showSidebar ? "content-with-sidebar" : ""}`} >
                <Outlet />
            </main>

        </div>
    );
}

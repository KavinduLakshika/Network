import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { House, Users, User, LogOut } from 'lucide-react';
import "./SideBar.css";

function SideBar({ onLogout }) {
    
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const logout = () => {
        onLogout();
    };

    return (
        <div className="wrapper">
            <aside id="sidebar" className={isExpanded ? "expand" : ""}>
                <div className="d-flex align-items-center mt-1">
                    <button className="toggle-btn" onClick={toggleSidebar} type="button">
                        <House />
                    </button>
                    <div className="sidebar-logo">
                        <Link to="/customers">Logo</Link>
                    </div>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-item">
                        <Link
                            to="/customers"
                            className={`sidebar-link ${isActive("/dashboard") ? "active" : ""}`}
                        >
                            <Users />
                            <span>Customers</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link
                            to="/users"
                            className={`sidebar-link ${isActive("/bookings") ? "active" : ""}`}
                        >
                            <User />
                            <span>Users</span>
                        </Link>
                    </li>
                </ul>

                <div className="sidebar-footer mb-3">
                    <Link to="/" className="sidebar-link" onClick={logout}>
                        <LogOut />
                        <span>Logout</span>
                    </Link>
                </div>

            </aside>
        </div>
    );
}

export default SideBar;
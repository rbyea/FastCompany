import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const pathClass = (path) => {
        return pathname === path ? "active" : "";
    };

    return (
        <nav className="nav nav-pills nav-fill">
            <Link className={`nav-link ${pathClass("/")}`} to="/">
                Главная
            </Link>
            <Link className={`nav-link ${pathClass("/login")}`} to="/login">
                Вход
            </Link>
            <Link className={`nav-link ${pathClass("/users")}`} to="/users">
                Пользователи
            </Link>
        </nav>
    );
};

export default Navbar;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";

const Navbar = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const pathClass = (path) => {
        return pathname === path ? "active" : "";
    };

    const { currentUser } = useAuth();

    return (
        <div className="header header-wrapper">
            <nav
                className={`nav nav-pills nav-fill ${
                    !currentUser ? "nav-full" : ""
                }`}
            >
                <Link className={`nav-link ${pathClass("/")}`} to="/">
                    Главная
                </Link>

                {!currentUser && (
                    <>
                        <Link
                            className={`nav-link ${pathClass("/login")}`}
                            to="/login"
                        >
                            Вход
                        </Link>
                    </>
                )}
                {currentUser && (
                    <Link
                        className={`nav-link ${pathClass("/users")}`}
                        to="/users"
                    >
                        Пользователи
                    </Link>
                )}
            </nav>
            {currentUser && <NavProfile />}
        </div>
    );
};

export default Navbar;

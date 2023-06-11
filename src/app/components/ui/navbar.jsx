import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavProfile from "./navProfile";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";

const Navbar = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const pathClass = (path) => {
        return pathname === path ? "active" : "";
    };

    const isLoggetIn = useSelector(getIsLoggedIn());

    return (
        <div className="header header-wrapper">
            <nav
                className={`nav nav-pills nav-fill ${
                    !isLoggetIn ? "nav-full" : ""
                }`}
            >
                <Link className={`nav-link ${pathClass("/")}`} to="/">
                    Главная
                </Link>

                {!isLoggetIn && (
                    <>
                        <Link
                            className={`nav-link ${pathClass("/login")}`}
                            to="/login"
                        >
                            Вход
                        </Link>
                    </>
                )}
                {isLoggetIn && (
                    <Link
                        className={`nav-link ${pathClass("/users")}`}
                        to="/users"
                    >
                        Пользователи
                    </Link>
                )}
            </nav>
            {isLoggetIn && <NavProfile />}
        </div>
    );
};

export default Navbar;

import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const NavProfile = () => {
    const [isShow, setIsShow] = React.useState(false);
    const { currentUser } = useAuth();

    const handleClick = () => {
        setIsShow((prevState) => !prevState);
    };

    return (
        <div className="nav-profile dropdown" onClick={handleClick}>
            <div className="nav-user font-monospace fs-3  dropdown-toggle">
                <img
                    src={currentUser.image}
                    className="rounded-circle"
                    alt={currentUser.name}
                    width="50"
                />
                {currentUser.name}
            </div>
            <ul
                className={`dropdown-menu dropdown-menu-dark ${
                    isShow ? "show" : ""
                }`}
                aria-labelledby="dropdownMenuButton2"
            >
                <li>
                    <Link
                        className="dropdown-item"
                        to={`/users/${currentUser._id}`}
                    >
                        Профиль
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="/logout">
                        Выход
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default NavProfile;

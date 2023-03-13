import React from "react";
import PropTypes from "prop-types";
import UserIcon from "../assets/user.png";
import { useHistory } from "react-router-dom";

const UserItem = ({ user }) => {
    const history = useHistory();

    const onHandleLink = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <>
                <div className="card">
                    <img
                        src={UserIcon}
                        className="card-img-top"
                        alt={user.name}
                    />
                    <div className="card-body">
                        <h2 className="card-title">{user.name}</h2>
                        <p className="card-text">
                            <strong>Профессия:</strong> {user.profession.name}
                        </p>

                        <div className="card-wrap">
                            {user.qualities.map((el) => console.log(el))}
                            <p>
                                <strong>Проведено встреч:</strong>{" "}
                                {user.completedMeetings}
                            </p>
                            <p>
                                <strong>Рейтинг пользователя:</strong>{" "}
                                {user.rate}
                            </p>
                        </div>
                    </div>
                    <ul className="list-group list-group-flush card-list">
                        {user.qualities.map((el) => (
                            <li className="list-group-item" key={el._id}>
                                <span className={`badge bg-${el.color}`}>
                                    {el.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="card-body">
                        <button
                            onClick={onHandleLink}
                            className="btn btn-primary card-link"
                        >
                            Вернуться назад
                        </button>
                    </div>
                </div>
            </>
        );
    }
    return "Загрузка...";
};

UserItem.propTypes = {
    user: PropTypes.object
};

export default UserItem;

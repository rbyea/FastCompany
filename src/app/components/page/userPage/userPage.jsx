import React, { useEffect, useState } from "react";
import UserIcon from "../../../assets/user.png";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import PropTypes from "prop-types";

const UserPage = ({ paramsId }) => {
    const history = useHistory();
    const [userId, setUserId] = useState();

    useEffect(() => {
        api.users.getById(paramsId).then((data) => setUserId(data));
    }, []);

    const onHandleLink = () => {
        history.push(`/users/${paramsId}/edit`);
    };

    const onHandleBack = () => {
        history.push("/users");
    };

    if (userId) {
        return (
            <>
                <div className="card">
                    <img
                        src={UserIcon}
                        className="card-img-top"
                        alt={userId.name}
                    />
                    <div className="card-body">
                        <h2 className="card-title">{userId.name}</h2>
                        <p className="card-text">
                            <strong>Профессия:</strong> {userId.profession.name}
                        </p>

                        <div className="card-wrap">
                            <p>
                                <strong>Проведено встреч:</strong>{" "}
                                {userId.completedMeetings}
                            </p>
                            <p>
                                <strong>Рейтинг пользователя:</strong>{" "}
                                {userId.rate}
                            </p>
                        </div>
                    </div>
                    <ul className="list-group list-group-flush card-list">
                        {userId.qualities.map((el) => (
                            <li className="list-group-item" key={el._id}>
                                <span className={`badge bg-${el.color}`}>
                                    {el.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="card-body card-wrap">
                        <button
                            onClick={onHandleLink}
                            className="btn btn-primary card-link"
                        >
                            Редактировать
                        </button>

                        <button
                            onClick={onHandleBack}
                            className="btn btn-primary card-link"
                        >
                            Все пользователи
                        </button>
                    </div>
                </div>
            </>
        );
    }
    return "Загрузка...";
};

UserPage.propTypes = {
    paramsId: PropTypes.string
};

export default UserPage;
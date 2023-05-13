import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
    const { error, initialData, status, progressCount } = useMockData();

    const handleButton = () => {
        initialData();
    };

    return (
        <div className="main-content">
            <h2>Главная</h2>
            <h3>Инициализация данных в FireBase</h3>
            <ul>
                <li>
                    Статус: <strong>{status}</strong>
                </li>
                <li>
                    Прогресс: <strong>{progressCount}%</strong>
                </li>
                {error && (
                    <li>
                        Ошибка: <strong color={{ color: "red" }}>{error}</strong>
                    </li>
                )}
            </ul>
            <button onClick={handleButton} className="btn btn-primary">
                Инициализировать
            </button>
        </div>
    );
};

export default Main;

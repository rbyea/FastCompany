import professions from "../mockData/professions.json";
import users from "../mockData/users.json";
import qualities from "../mockData/qualities.json";
import { useEffect, useState } from "react";
import httpService from "../services/http.service";

const useMockData = () => {
    const statusConsts = {
        idle: "Не запущенно",
        padding: "В процессе",
        complited: "Завершенно",
        error: "Ошибка в загрузке данных в FireBase"
    };

    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [count, setCount] = useState(0);
    const [progressCount, setProgressCount] = useState(0);
    const summeryCount = professions.length + users.length + qualities.length;

    const initialCount = () => {
        setCount((prevStat) => prevStat + 1);
    };

    const updateProgress = () => {
        if (count !== 0 && status === statusConsts.idle) {
            setStatus(statusConsts.padding);
        }

        const newProgress = Math.floor((count / summeryCount) * 100);

        if (progressCount < newProgress) {
            setProgressCount(() => newProgress);
        }

        if (newProgress === 100) {
            setStatus(statusConsts.complited);
        }
    };

    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialData() {
        try {
            for (const prof of professions) {
                await httpService.put("profession/" + prof._id, prof);
                initialCount();
            }
            for (const user of users) {
                await httpService.put("user/" + user._id, user);
                initialCount();
            }
            for (const qual of qualities) {
                await httpService.put("quality/" + qual._id, qual);
                initialCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConsts.error);
        }
    }

    return { error, initialData, status, progressCount };
};

export default useMockData;

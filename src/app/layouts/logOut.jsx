import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../store/users";

const LogOut = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(logOut());
    }, []);

    return <h1>Загрузка...</h1>;
};

export default LogOut;

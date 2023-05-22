import React from "react";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
    const { removeAllTokens } = useAuth();

    React.useEffect(() => {
        removeAllTokens();
    }, []);

    return <h1>Загрузка...</h1>;
};

export default LogOut;

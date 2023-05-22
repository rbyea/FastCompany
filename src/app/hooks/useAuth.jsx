import React, { useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, {
    setTokens
} from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = React.useState();
    const [error, setError] = React.useState(null);
    const [isLoading, setLoading] = React.useState(true);
    const history = useHistory();

    function randomNumbers(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async function singUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                password,
                rate: randomNumbers(1, 5),
                completedMeetings: randomNumbers(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
        } catch (error) {
            errorCatcher(error);

            const { code, message } = error.response.data.error;
            if (code === 400 && message === "EMAIL_EXISTS") {
                const errorObject = {
                    email: "Пользователь с такой почтой уже существует"
                };
                throw errorObject;
            }
        }
    }

    async function singIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                `accounts:signInWithPassword`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            setTokens(data);
            await userJoin(data);
            await getUserData();
        } catch (error) {
            const { code, message } = error.response.data.error;

            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const emailFoundObject = {
                        email: "Неверно введена почта"
                    };

                    throw emailFoundObject;
                }

                if (message === "INVALID_PASSWORD") {
                    const passwordFoundObject = {
                        password: "Неверно введен пароль"
                    };

                    throw passwordFoundObject;
                }
            }
        }
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function userJoin(data) {
        try {
            const { content } = await userService.get(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function removeAllTokens() {
        localStorageService.removeAllKey();
        setUser(null);
        history.push("/");
    }

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        if (localStorageService.getTokenKey()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <AuthContext.Provider
            value={{ singUp, currentUser, singIn, removeAllTokens }}
        >
            {!isLoading ? (
                children
            ) : (
                <h1 color={{ color: "#fff" }}>Загрузка...</h1>
            )}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;

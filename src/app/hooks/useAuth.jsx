import React, { useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = React.useState([]);
    const [error, setError] = React.useState(null);

    async function singUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            console.log(data);
            setTokens(data);
            await createUser({ _id: data.localId, email, password, ...rest });
            console.log(currentUser);
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
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;

        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            console.log(data);
            await userJoin(data);
        } catch (error) {
            console.log("error", error);
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
        <AuthContext.Provider value={{ singUp, currentUser, singIn }}>
            {children}
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

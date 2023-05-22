import React, { useContext } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        getUser();
    }, []);

    React.useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getUser() {
        try {
            const { content } = await userService.get();
            setUsers(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    function getUserId(userId) {
        return users.find((u) => u._id === userId);
    }

    return (
        <UserContext.Provider value={{ users, getUserId }}>
            {!isLoading ? children : "Загрузка..."}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserProvider;

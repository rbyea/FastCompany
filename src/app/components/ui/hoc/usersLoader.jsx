import React from "react";
import { getDataStatus, loadUsersList } from "../../../store/users";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const UsersLoader = ({ children }) => {
    const dataLoader = useSelector(getDataStatus());
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (!dataLoader) {
            dispatch(loadUsersList());
        }
    }, []);
    if (!dataLoader) return <h2>Загрузка...</h2>;
    return children;
};

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UsersLoader;

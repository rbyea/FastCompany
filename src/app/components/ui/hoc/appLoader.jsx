import React from "react";
import {
    getIsLoggedIn,
    getLoadingUsersStatus,
    loadUsersList
} from "../../../store/users";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { loadQualitiesList } from "../../../store/qualities";
import { loadProffesionsList } from "../../../store/proffesions";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggetIn = useSelector(getIsLoggedIn());
    const usersStatusLoading = useSelector(getLoadingUsersStatus());
    React.useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProffesionsList());
        if (isLoggetIn) {
            dispatch(loadUsersList());
        }
    }, [isLoggetIn]);
    if (usersStatusLoading) return "Загрузка...";
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;

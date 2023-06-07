import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getLoadingProffesionsStatus,
    getProffesionById,
    loadProffesionsList
} from "../../store/proffesions";

const Profession = ({ id }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getLoadingProffesionsStatus());
    const getProffesion = useSelector(getProffesionById(id));

    React.useEffect(() => {
        dispatch(loadProffesionsList());
    }, []);

    if (!isLoading) {
        return <p>{getProffesion.name}</p>;
    } else return "Загрузка...";
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;

import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getLoadingProffesionsStatus,
    getProffesionById
} from "../../store/proffesions";

const Profession = ({ id }) => {
    const isLoading = useSelector(getLoadingProffesionsStatus());
    const getProffesion = useSelector(getProffesionById(id));

    if (!isLoading) {
        return <p>{getProffesion.name}</p>;
    } else return "Загрузка...";
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;

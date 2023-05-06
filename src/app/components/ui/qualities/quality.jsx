import React from "react";
import PropTypes from "prop-types";
import { useQualitie } from "../../../hooks/useQualitie";
const Quality = ({ id }) => {
    const { getQualitie, isLoading } = useQualitie();
    const qual = getQualitie(id);

    if (!isLoading) {
        return (
            <span className={"badge m-1 bg-" + qual.color}>{qual.name}</span>
        );
    } else return "Загрузка...";
};
Quality.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default Quality;

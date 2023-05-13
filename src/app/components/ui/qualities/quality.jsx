import React from "react";
import PropTypes from "prop-types";
import { useQualitie } from "../../../hooks/useQualitie";
const Quality = ({ id }) => {
    const { getQualitie } = useQualitie();
    const qual = getQualitie(id);

    return (
        <span className={"badge m-1 bg-" + qual.color}>{qual.name}</span>
    );
};
Quality.propTypes = {
    id: PropTypes.string.isRequired
};

export default Quality;

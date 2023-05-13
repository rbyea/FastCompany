import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useQualitie } from "../../../hooks/useQualitie";

const Qualities = ({ qualities }) => {
    const { isLoading } = useQualitie();

    if (isLoading) {
        return "Загрузка...";
    } else return qualities.map((qual) => <Quality key={qual} id={qual} />);
};

Qualities.propTypes = {
    qualities: PropTypes.array
};

export default Qualities;

import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";

const Qualities = ({ qualities }) => {
    return qualities.map((qual) => <Quality key={qual} id={qual} />);
};

Qualities.propTypes = {
    qualities: PropTypes.array
};

export default Qualities;

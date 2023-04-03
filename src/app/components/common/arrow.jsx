import React from "react";
import PropTypes from "prop-types";

const Arrow = ({ order }) => {
    return (
        <>
            {order === "asc" ? (
                <i className="arrow-table bi bi-caret-up-fill"></i>
            ) : (
                <i className="arrow-table bi bi-caret-down-fill"></i>
            )}
        </>
    );
};

Arrow.propTypes = {
    order: PropTypes.string
};

export default Arrow;

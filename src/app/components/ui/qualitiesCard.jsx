import React from "react";
import QualitiesList from "./qualities/qualitiesList";
import PropTypes from "prop-types";

const QualitiesCard = ({ data }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Качества</span>
                </h5>
                <div className="card-text">
                    <QualitiesList qualities={data} />
                </div>
            </div>
        </div>
    );
};

QualitiesCard.propTypes = {
    data: PropTypes.array.isRequired
};

export default QualitiesCard;

import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualitibyId,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";

const Qualities = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualiti = useSelector(getQualitibyId(qualities));

    React.useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    if (isLoading) {
        return "Загрузка...";
    } else return qualiti.map((qual) => <Quality key={qual._id} {...qual} />);
};

Qualities.propTypes = {
    qualities: PropTypes.array
};

export default Qualities;

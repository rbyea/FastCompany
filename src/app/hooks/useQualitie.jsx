import React from "react";
import qualitieService from "../services/qualitie.service";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const QualitieContext = React.createContext();

export const useQualitie = () => {
    return React.useContext(QualitieContext);
};

export const QualitieProvider = ({ children }) => {
    const [isLoading, setLoading] = React.useState(true);
    const [qualities, setQualitie] = React.useState([]);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    React.useEffect(() => {
        getQualitieList();
    }, []);

    async function getQualitieList() {
        try {
            const { content } = await qualitieService.fetchAll();
            setQualitie(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function getQualitie(id) {
        return qualities.find((qual) => qual._id === id);
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <QualitieContext.Provider value={{ qualities, isLoading, getQualitie }}>
            {children}
        </QualitieContext.Provider>
    );
};

QualitieProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

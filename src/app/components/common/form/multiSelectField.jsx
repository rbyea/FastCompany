import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const handleChange = (value) => {
        onChange({ name, value });
    };

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;

    return (
        <div className="mb-3">
            <div className="form-label">{label}</div>
            <Select
                isMulti
                closeMenuOnSelect={false}
                placeholder="Выбрать..."
                defaultValue={defaultValue}
                options={optionsArray}
                onChange={handleChange}
                className="basic-multi-select"
                classNamePrefix={name}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.array,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default MultiSelectField;

import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, name, value, onChange, professions, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClassName = () => {
        return "form-select" + (error ? " is-invalid" : " is-valid");
    };

    const optionsArray =
        !Array.isArray(professions) && typeof professions === "object"
            ? Object.values(professions)
            : professions;

    return (
        <div className="mb-3">
            <label className="label-width form-label">
                <div>{label}</div>
                <select
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClassName()}
                >
                    <option value="" disabled>
                        Выбрать
                    </option>

                    {optionsArray.length > 0 &&
                        optionsArray.map((prof) => (
                            <option key={prof.value} value={prof.value}>
                                {prof.label}
                            </option>
                        ))}
                </select>
                {error && <div className="invalid-feedback">{error}</div>}
            </label>
        </div>
    );
};

SelectField.propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    professions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default SelectField;

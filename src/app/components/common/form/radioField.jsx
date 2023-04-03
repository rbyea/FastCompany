import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ label, name, options, value, onChange }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-3 form-label">
            <div>{label}</div>

            <div className="form-wrap">
                {options.map((person) => (
                    <div key={person.name} className="form-check">
                        <label className="form-check-label">
                            <input
                                value={person.value}
                                className="form-check-input"
                                type="radio"
                                checked={person.value === value}
                                name={name}
                                onChange={handleChange}
                            />
                            <div className="input-radio-descr">
                                {person.name}
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

RadioField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default RadioField;

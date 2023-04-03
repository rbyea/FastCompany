import React from "react";
import PropTypes from "prop-types";

const CheckboxField = ({ name, value, onChange, error, children }) => {
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };

    const getInputClassName = () => {
        return "form-check-input" + (error ? " is-invalid" : " is-valid");
    };
    return (
        <>
            <div className="form-check mb-3">
                <input
                    className={getInputClassName()}
                    type="checkbox"
                    value=""
                    checked={value}
                    id={name}
                    onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={name}>
                    {children}
                </label>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </>
    );
};

CheckboxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    error: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default CheckboxField;

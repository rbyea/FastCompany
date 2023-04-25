import React from "react";
import PropTypes from "prop-types";

const TextareaField = ({
    label,
    value,
    onChange,
    placeholder,
    name,
    error
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-3">
            <label className="form-label">
                <div>{label}</div>

                <textarea
                    className={
                        error
                            ? "form-control is-invalid"
                            : "form-control is-valid"
                    }
                    rows="3"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    name={name}
                ></textarea>

                {error && <div className="invalid-feedback">{error}</div>}
            </label>
        </div>
    );
};

TextareaField.propTypes = {
    error: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default TextareaField;

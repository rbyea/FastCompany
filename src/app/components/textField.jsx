import React from "react";
import PropTypes from "prop-types";

function TextField({ label, type, value, onChange, placeholder, name, error }) {
    const [eye, setEye] = React.useState(false);

    const toggleShowEye = () => {
        setEye(prevState => !prevState);
    };

    return (
        <div className="mb-3">
            <label className="form-label">
                <div>{label}</div>
                <input
                    className={
                        error
                            ? "form-control is-invalid"
                            : "form-control is-valid"
                    }
                    type={eye ? "text" : type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    name={name}
                />

                {type === "password" ? (
                    <span onClick={toggleShowEye} className="eye-item">
                        {eye ? (
                            <i className="bi bi-eye"></i>
                        ) : (
                            <i className="bi bi-eye-slash"></i>
                        )}
                    </span>
                ) : null}

                {error && <div className="invalid-feedback">{error}</div>}
            </label>
        </div>
    );
}

TextField.propTypes = {
    error: PropTypes.string,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default TextField;

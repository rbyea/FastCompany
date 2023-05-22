import React from "react";
import PropTypes from "prop-types";
import TextareaField from "../form/textareaField";
import { validator } from "../../../utils/validator";

const AddCommentForm = ({ onSubmit }) => {
    const [error, setError] = React.useState({});
    const [data, setData] = React.useState({});

    React.useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        content: {
            isRequired: {
                message: "Это обязательный пункт для заполнения!"
            },
            min: {
                message: "Сообщение должен состоять минимум из 3 символов",
                value: 3
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setError(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(error).length === 0;

    const handleChange = (target) => {
        setData((prevStat) => ({
            ...prevStat,
            [target.name]: target.value
        }));
    };

    const clearForm = () => {
        setData({});
        setError({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Новый комментарий</h2>

            <TextareaField
                label="Сообщение"
                value={data.content || ""}
                name="content"
                placeholder="Сообщение"
                onChange={handleChange}
                error={error.content}
            />

            <button
                disabled={!isValid}
                type="submit"
                className="btn btn-primary"
            >
                Опубликовать
            </button>
        </form>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;

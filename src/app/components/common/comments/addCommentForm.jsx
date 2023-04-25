import React from "react";
import PropTypes from "prop-types";
import SelectField from "../form/selectField";
import TextareaField from "../form/textareaField";
import { validator } from "../../../utils/validator";
import API from "../../../api";
const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
    const [users, setUsers] = React.useState({});
    const [error, setError] = React.useState({});
    const [data, setData] = React.useState(initialData);

    React.useEffect(() => {
        API.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);

    React.useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Это обязательный пункт для заполнения!"
            }
        },
        content: {
            isRequired: {
                message: "Это обязательный пункт для заполнения!"
            },
            min: {
                message: "Сообщение должен состоять минимум из 8 символов",
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
        setData(initialData);
        setError({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        }));

    return (
        <form onSubmit={handleSubmit}>
            <h2>Новый комментарий</h2>
            <div>
                <SelectField
                    value={data.userId}
                    professions={arrayOfUsers}
                    name="userId"
                    defaultOption="Выберите пользователя"
                    onChange={handleChange}
                    error={error.userId}
                />
            </div>

            <TextareaField
                label="Сообщение"
                value={data.content}
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

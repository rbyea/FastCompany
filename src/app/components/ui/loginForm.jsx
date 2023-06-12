import React from "react";
import TextField from "../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import { getLoginAuthError, login } from "../../store/users";
import { validator } from "../../utils/validator";

const LoginForm = () => {
    const [data, setData] = React.useState({ email: "", password: "" });
    const enterError = useSelector(getLoginAuthError());
    const [errors, setErrors] = React.useState({});
    const dispatch = useDispatch();

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            }
        }
    };

    React.useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const onSubmitForm = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const redirect = "/users";
        dispatch(login({ payload: data, redirect }));
    };
    return (
        <form onSubmit={onSubmitForm}>
            <TextField
                error={errors.email}
                label="Почта"
                type="text"
                value={data.email}
                onChange={handleChange}
                placeholder="Введите почту"
                name="email"
            />
            <TextField
                error={errors.password}
                label="Пароль"
                type="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Введите пароль"
                name="password"
            />
            {enterError && <p className="errorAuth">{enterError}</p>}
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary"
            >
                Войти
            </button>
        </form>
    );
};

export default LoginForm;

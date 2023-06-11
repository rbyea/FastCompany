import React from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import * as yup from "yup";
// import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/users";

const LoginForm = () => {
    const [data, setData] = React.useState({ email: "", password: "" });
    const [error, setError] = React.useState({});
    const dispatch = useDispatch();

    // const history = useHistory();

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validateScheme = yup.object().shape({
        password: yup.string().required("Пароль обязателен для заполнения!"),
        email: yup
            .string()
            .required("Электронная почта обязательна для заполнения!")
    });

    React.useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validateScheme);

        validateScheme
            .validate(data)
            .then(() => setError({}))
            .catch((err) => setError({ [err.path]: err.message }));
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(error).length === 0;
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
                error={error.email}
                label="Почта"
                type="text"
                value={data.email}
                onChange={handleChange}
                placeholder="Введите почту"
                name="email"
            />
            <TextField
                error={error.password}
                label="Пароль"
                type="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Введите пароль"
                name="password"
            />
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

import React from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
    const [data, setData] = React.useState({ email: "", password: "" });
    const [error, setError] = React.useState({});
    const onChangeInput = ({ target }) => {
        setData((prev) => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения!"
            },
            isEmail: {
                message: "Почта введена некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения!"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглвную букву!"
            },

            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число!"
            },

            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        }
    };

    React.useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setError(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(error).length === 0;
    const onSubmitForm = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    return (
        <div className="container form-block">
            <h2>Вход</h2>

            <form onSubmit={onSubmitForm}>
                <TextField
                    error={error.email}
                    label="Почта"
                    type="text"
                    value={data.email}
                    onChange={onChangeInput}
                    placeholder="Введите почту"
                    name="email"
                />
                <TextField
                    error={error.password}
                    label="Пароль"
                    type="password"
                    value={data.password}
                    onChange={onChangeInput}
                    placeholder="Введите пароль"
                    name="password"
                />
                <button type="submit" disabled={!isValid} className="btn btn-primary">
                    Войти
                </button>
            </form>
        </div>
    );
};

export default Login;

import React from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import * as yup from "yup";

const LoginForm = () => {
    const [data, setData] = React.useState({ email: "", password: "" });
    const [error, setError] = React.useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    // const validatorConfig = {
    //     email: {
    //         isRequired: {
    //             message: "Электронная почта обязательна для заполнения!"
    //         },
    //         isEmail: {
    //             message: "Почта введена некорректно"
    //         }
    //     },
    //     password: {
    //         isRequired: {
    //             message: "Пароль обязателен для заполнения!"
    //         },
    //         isCapitalSymbol: {
    //             message: "Пароль должен содержать хотя бы одну заглвную букву!"
    //         },

    //         isContainDigit: {
    //             message: "Пароль должен содержать хотя бы одно число!"
    //         },

    //         min: {
    //             message: "Пароль должен состоять минимум из 8 символов",
    //             value: 8
    //         }
    //     }
    // };

    const validateScheme = yup.object().shape({
        password: yup
            .string()
            .required("Пароль обязателен для заполнения!")
            .matches(
                /[A-Z]+/g,
                "Пароль должен содержать хотя бы одну заглвную букву!"
            )
            .matches(/\d+/g, "Пароль должен содержать хотя бы одно число!")
            .matches(
                /(?=.*[!@#$%^&*])/,
                "Пароль должен содержать один из специльных смполов !@$%^&*"
            )
            .matches(
                /(?=.{8,})/,
                "Пароль должен состоять минимум из 8 символов"
            ),
        email: yup
            .string()
            .required("Электронная почта обязательна для заполнения!")
            .email("Почта введена некорректно")
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
        // setError(errors);
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

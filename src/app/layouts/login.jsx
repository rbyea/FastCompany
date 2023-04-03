import React from "react";
import { Link, useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegistrationForm from "../components/ui/RegistrationForm";
const Login = () => {
    const { type } = useParams();

    const [formType, setFormType] = React.useState(
        type === "register" ? type : "login"
    );

    const toggleFormType = (params) => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <div className="container form-block">
            <h2>{formType === "register" ? "Регистрация" : "Вход"}</h2>

            {formType === "register" ? (
                <div>
                    <RegistrationForm />
                    <div className="mt-2">
                        <span>Есть аккаунт?</span>
                        <Link to="/login" onClick={toggleFormType}>
                            Войти
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <LoginForm />
                    <div className="mt-2">
                        <span>Нет аккаунта?</span>
                        <Link to="/login/register" onClick={toggleFormType}>
                            Регистрация
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;

import React from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckboxField from "../common/form/checkboxField";

const RegistrationForm = () => {
    const [qualities, setQualities] = React.useState([]);
    const [professions, setProfession] = React.useState([]);
    React.useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const [data, setData] = React.useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false
    });

    const [error, setError] = React.useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
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
        },
        profession: {
            isRequired: {
                message: "Необходимо выбрать профессию!"
            }
        },
        license: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения!"
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
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
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

            <SelectField
                label="Выберите Вашу профессию"
                name="profession"
                value={data.profession}
                onChange={handleChange}
                professions={professions}
                error={error.profession}
            />

            <RadioField
                label="Выберите ваш пол"
                options={[
                    { name: "Муж.", value: "male" },
                    { name: "Жен.", value: "female" }
                ]}
                name="sex"
                value={data.sex}
                onChange={handleChange}
            />
            <MultiSelectField
                options={qualities}
                name="qualities"
                defaulValue={data.qualities}
                label="Выберите ваши качества"
                onChange={handleChange}
            />

            <CheckboxField
                name="license"
                value={data.license}
                onChange={handleChange}
                error={error.license}
            >
                Подтвердить <a href="#">лицензионное соглашение</a>
            </CheckboxField>

            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary"
            >
                Регистрация
            </button>
        </form>
    );
};

export default RegistrationForm;

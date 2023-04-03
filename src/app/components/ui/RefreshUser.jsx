import React from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import MultiSelectField from "../common/form/multiSelectField";
import RadioField from "../common/form/radioField";
import { validator } from "../../utils/validator";
import api from "../../api";
import { useHistory, useParams } from "react-router-dom";

const RefreshUser = () => {
    const history = useHistory();
    const { paramsId } = useParams();
    const [qualities, setQualities] = React.useState([]);
    const [professions, setProfession] = React.useState([]);
    React.useEffect(() => {
        api.users.getById(paramsId).then((data) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                profession: data.profession._id,
                qualities: data.qualities.map((qual) => ({
                    label: qual.name,
                    value: qual._id
                }))
            }))
        );
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
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
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
        },
        name: {
            isRequired: {
                message: "Имя обязателена для заполнения!"
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
        api.users.update(paramsId, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
        history.push(`/users/${paramsId}`);
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

    const onHandleBack = () => {
        history.push(`/users/${paramsId}`);
    };

    if (data._id && professions && qualities) {
        return (
            <div className="container form-block card">
                <h2>Изменить пользователя</h2>
                <form onSubmit={onSubmitForm}>
                    <TextField
                        error={error.name}
                        label="Имя"
                        type="text"
                        value={data.name}
                        onChange={handleChange}
                        placeholder="Введите имя"
                        name="name"
                    />

                    <TextField
                        error={error.email}
                        label="Почта"
                        type="text"
                        value={data.email}
                        onChange={handleChange}
                        placeholder="Введите почту"
                        name="email"
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
                        defaultValue={data.qualities}
                        label="Выберите ваши качества"
                        onChange={handleChange}
                    />

                    <div className="card-wrap mt-4">
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary card-link"
                        >
                            Обновить
                        </button>

                        <button
                            onClick={onHandleBack}
                            className="btn btn-primary card-link"
                        >
                            Назад
                        </button>
                    </div>
                </form>
            </div>
        );
    } else {
        return <h2>Загрузка...</h2>;
    }
};

export default RefreshUser;

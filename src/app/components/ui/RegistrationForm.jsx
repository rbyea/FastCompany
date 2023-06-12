import React from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckboxField from "../common/form/checkboxField";
// import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesList,
    getQualitiesLoadingStatus
} from "../../store/qualities";
import {
    getLoadingProffesionsStatus,
    getProffesionsList
} from "../../store/proffesions";
import { signUp } from "../../store/users";

const RegistrationForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = React.useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        name: "",
        qualities: [],
        license: false
    });

    const qualities = useSelector(getQualitiesList());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = qualities.map((q) => ({
        value: q._id,
        label: q.name
    }));

    const professions = useSelector(getProffesionsList());
    const professionsLoading = useSelector(getLoadingProffesionsStatus());
    const professionsList = professions.map((q) => ({
        value: q._id,
        label: q.name
    }));

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
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения!"
            },
            min: {
                message: "Имя должено состоять минимум из 3 символов",
                value: 3
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

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof._id === id) {
                return prof._id;
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality]._id) {
                    qualitiesArray.push(qualities[quality]._id);
                }
            }
        }
        return qualitiesArray;
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;

        const newData = {
            ...data,
            bookmark: false,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        };

        dispatch(signUp(newData));
        // toast.success("Регистрация успешно завершена!");
    };

    if (!qualitiesLoading && !professionsLoading) {
        return (
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
                    professions={professionsList}
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
                    options={qualitiesList}
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
    } else {
        return <h2>Загрузка...</h2>;
    }
};

export default RegistrationForm;

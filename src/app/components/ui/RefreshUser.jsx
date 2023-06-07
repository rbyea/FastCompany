import React from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import MultiSelectField from "../common/form/multiSelectField";
import RadioField from "../common/form/radioField";
import { validator } from "../../utils/validator";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import {
    getQualitiesList,
    getQualitiesLoadingStatus
} from "../../store/qualities";
import {
    getLoadingProffesionsStatus,
    getProffesionsList
} from "../../store/proffesions";

const RefreshUser = () => {
    const [data, setData] = React.useState();

    const history = useHistory();
    const { paramsId } = useParams();
    const professions = useSelector(getProffesionsList());
    const isLoadingProf = useSelector(getLoadingProffesionsStatus());
    const qualities = useSelector(getQualitiesList());
    const isLoadingQual = useSelector(getQualitiesLoadingStatus());
    const { currentUser, updateProfileUser } = useAuth();
    const [isLoading, setIsLoading] = React.useState(true);

    const profListUser = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const qualListUser = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const getQualitieUser = (qualitiIds) => {
        const resultArray = [];
        for (const ids of qualitiIds) {
            for (const quality of qualities) {
                if (ids === quality._id) {
                    resultArray.push({
                        label: quality.name,
                        value: quality._id
                    });
                    break;
                }
            }
        }
        return resultArray;
    };

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
        if (data && isLoading) setIsLoading(false);
    }, [data]);

    React.useEffect(() => {
        if (!isLoadingProf && !isLoadingQual && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: getQualitieUser(currentUser.qualities)
            });
        }
    }, [isLoadingProf, isLoadingQual, currentUser, data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setError(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(error).length === 0;
    const onSubmitForm = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        await updateProfileUser({
            ...data,
            qualities: data.qualities.map((qual) => qual.value)
        });
        history.push(`/users/${paramsId}`);
    };

    // function getQualitieUser(elements) {
    //     const qualitiesArray = [];
    //     for (const elem of elements) {
    //         const qualElem = getQualitie(elem);
    //         qualitiesArray.push({
    //             label: qualElem.name,
    //             value: qualElem._id
    //         });
    //     }
    //     return qualitiesArray;
    // }

    const onHandleBack = () => {
        history.push(`/users/${paramsId}`);
    };

    if (!isLoading && !isLoadingProf && !isLoadingQual) {
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
                        professions={profListUser}
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
                        options={qualListUser}
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

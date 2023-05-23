import React from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import MultiSelectField from "../common/form/multiSelectField";
import RadioField from "../common/form/radioField";
import { validator } from "../../utils/validator";
import { useHistory, useParams } from "react-router-dom";
import { useProfessions } from "../../hooks/useProffesion";
import { useQualitie } from "../../hooks/useQualitie";
import { useAuth } from "../../hooks/useAuth";

const RefreshUser = () => {
    const history = useHistory();
    const { paramsId } = useParams();
    const { professions, isLoading: isLoadingProf } = useProfessions();
    const { qualities, isLoading: isLoadingQual, getQualitie } = useQualitie();
    const { currentUser, updateProfileUser } = useAuth();

    const profListUser = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const qualListUser = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const [data, setData] = React.useState({
        name: currentUser.name,
        email: currentUser.email,
        profession: currentUser.profession,
        sex: currentUser.sex,
        qualities: getQualitieUser(currentUser.qualities)
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
    const onSubmitForm = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        // const { profession, qualities } = data;
        // api.users.update(paramsId, {
        //     ...data,
        //     profession: getProfessionById(profession),
        //     qualities: getQualities(qualities)
        // });

        try {
            await updateProfileUser({
                ...data,
                qualities: data.qualities.map((qual) => qual.value)
            });
            history.push(`/users/${paramsId}`);
        } catch (error) {
            console.log(error);
        }
    };

    function getQualitieUser(elements) {
        const qualitiesArray = [];
        for (const elem of elements) {
            const qualElem = getQualitie(elem);
            qualitiesArray.push({
                label: qualElem.name,
                value: qualElem._id
            });
        }
        return qualitiesArray;
    }

    const onHandleBack = () => {
        history.push(`/users/${paramsId}`);
    };

    if (!isLoadingProf && !isLoadingQual) {
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

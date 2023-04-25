import React from "react";
import SelectField from "./form/selectField";
import TextareaField from "./form/textareaField";
import PropTypes from "prop-types";

const CreateComment = ({
    onSubmitForm,
    data,
    error,
    isValid,
    users,
    handleChange
}) => {
    return (
        <div className="card mb-2">
            <div className="card-body">
                <form onSubmit={onSubmitForm}>
                    <h2>Новый комментарий</h2>
                    <div>
                        <SelectField
                            value={data.userId}
                            professions={users}
                            name="userId"
                            defaultValue={data.userId}
                            onChange={handleChange}
                            error={error.userId}
                        />
                    </div>

                    <TextareaField
                        label="Сообщение"
                        value={data.content}
                        name="content"
                        placeholder="Сообщение"
                        onChange={handleChange}
                        error={error.content}
                    />

                    <button
                        disabled={!isValid}
                        type="submit"
                        className="btn btn-primary"
                    >
                        Опубликовать
                    </button>
                </form>
            </div>
        </div>
    );
};

CreateComment.propTypes = {
    onSubmitForm: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    isValid: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
};

export default CreateComment;

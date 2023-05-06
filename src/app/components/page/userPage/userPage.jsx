import React, { useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = ({ paramsId }) => {
    const [userParams, setUserParams] = useState();

    useEffect(() => {
        api.users.getById(paramsId).then((data) => {
            setUserParams(data);
        });
    }, []);

    if (userParams) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 md-3">
                        <UserCard user={userParams} />
                        <QualitiesCard data={userParams.qualities} />
                        <MeetingsCard value={userParams.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    }
    return "Загрузка...";
};

UserPage.propTypes = {
    paramsId: PropTypes.string
};

export default UserPage;

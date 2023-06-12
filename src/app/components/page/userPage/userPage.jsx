import React from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { useSelector } from "react-redux";
import { getUserId } from "../../../store/users";

const UserPage = ({ paramsId }) => {
    const user = useSelector(getUserId(paramsId));

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 md-3">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingsCard value={user.completedMeetings} />
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

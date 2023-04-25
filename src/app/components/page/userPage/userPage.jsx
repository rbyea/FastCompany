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

                        {/* <div className="card mb-3">
                                <div className="card-body">
                                    <h2>Комментарии</h2>
                                    <hr />

                                    {sortedComments.length > 0 ? (
                                        sortedComments.map((comment) => {
                                            const user = users.find(
                                                (user) =>
                                                    user.value ===
                                                    comment.userId
                                            );
                                            return (
                                                <div key={comment.created_at}>
                                                    <UserComment
                                                        createdAt={
                                                            comment.created_at
                                                        }
                                                        handleDeleteComment={
                                                            handleDeleteComment
                                                        }
                                                        randomNumbers={
                                                            randomNumber
                                                        }
                                                        handleLinkUser={
                                                            handleLinkUser
                                                        }
                                                        user={user}
                                                        comment={comment}
                                                    />
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <h2>Новых комментарий пока нет</h2>
                                    )}
                                </div>
                            </div> */}
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

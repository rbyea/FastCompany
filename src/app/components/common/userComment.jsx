import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { timeMessage } from "../../utils/timeComment";

const UserComment = ({
    handleLinkUser,
    randomNumbers,
    user,
    comment,
    createdAt,
    handleDeleteComment
}) => {
    const { paramsId } = useParams();
    return (
        <div className="bg-dark card-body mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start">
                        <img
                            src={`https://avatars.dicebear.com/api/avataaars/${randomNumbers}.svg`}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />

                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1">
                                        <button
                                            className={`comment-link-user`}
                                            onClick={() =>
                                                handleLinkUser(user.value)
                                            }
                                            style={
                                                paramsId === user.value
                                                    ? {
                                                          pointerEvents: "none",
                                                          color: "#ffff"
                                                      }
                                                    : {
                                                          pointerEvents: "all"
                                                      }
                                            }
                                        >
                                            {user.label}
                                        </button>

                                        <span className="small ms-2">
                                            {timeMessage(createdAt)}
                                        </span>
                                    </p>
                                    <button
                                        onClick={() =>
                                            handleDeleteComment(comment._id)
                                        }
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <p className="small mb-0">{comment.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserComment.propTypes = {
    handleDeleteComment: PropTypes.func.isRequired,
    user: PropTypes.object,
    comment: PropTypes.object,
    handleLinkUser: PropTypes.func.isRequired,
    createdAt: PropTypes.number.isRequired,
    randomNumbers: PropTypes.string.isRequired
};

export default UserComment;

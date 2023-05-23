import React from "react";
import PropTypes from "prop-types";
import { timeMessage } from "../../../utils/timeComment";
import { useUser } from "../../../hooks/useUser";
import { useAuth } from "../../../hooks/useAuth";

const Comment = ({
    content,
    created_at: created,
    _id: id,
    userId,
    onRemove
}) => {
    const { getUserId } = useUser();
    const { currentUser } = useAuth();
    const user = getUserId(userId);

    return (
        <div className="bg-dark card-body mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start">
                        <img
                            src={user.image}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />

                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1">
                                        <button className={`comment-link-user`}>
                                            {user && user.name}{" "}
                                        </button>

                                        <span className="small ms-2">
                                            {timeMessage(created)}
                                        </span>
                                    </p>
                                    {currentUser._id === userId && (
                                        <button
                                            onClick={() => onRemove(id)}
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    )}
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    content: PropTypes.string,
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _id: PropTypes.string,
    userId: PropTypes.string,
    onRemove: PropTypes.func
};

export default Comment;

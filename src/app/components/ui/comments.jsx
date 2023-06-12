import React from "react";
import _ from "lodash";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import {
    getCommentsList,
    getLoadingCommentsStatus,
    loadCommentsList,
    createCommentPage,
    deleteComment
} from "../../store/comments";
import { getCurrentUserId } from "../../store/users";
import { nanoid } from "nanoid";

const Comments = () => {
    const { paramsId } = useParams();
    const dispatch = useDispatch();

    const comments = useSelector(getCommentsList());
    const commentsLoadingStatus = useSelector(getLoadingCommentsStatus());
    const currentUserId = useSelector(getCurrentUserId());

    React.useEffect(() => {
        dispatch(loadCommentsList(paramsId));
    }, [paramsId]);

    const onSubmitForm = (data) => {
        const comment = {
            ...data,
            pageId: paramsId,
            userId: currentUserId,
            created_at: Date.now(),
            _id: nanoid()
        };

        dispatch(createCommentPage(comment));
    };

    const handleDeleteComment = (id) => {
        dispatch(deleteComment(id));
    };

    const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onSubmit={onSubmitForm} />
                </div>
            </div>
            <div className="card md-3">
                <div className="card-body">
                    <h2>Комментарии</h2>
                    <hr />
                    {!commentsLoadingStatus ? (
                        sortedComments.length > 0 ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleDeleteComment}
                            />
                        ) : (
                            <h2>Новых комментарий пока нет</h2>
                        )
                    ) : (
                        <h2>Загрузка...</h2>
                    )}
                </div>
            </div>
        </>
    );
};

export default Comments;

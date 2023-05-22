import React from "react";
import _ from "lodash";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useComments } from "../../hooks/useComments";

const Comments = () => {
    const { createComments, comments, removeComment } = useComments();

    const onSubmitForm = (data) => {
        createComments(data);

        // api.comments
        //     .add({ ...data, pageId: paramsId })
        //     .then((data) => setComments([...comments, data]));
    };

    const handleDeleteComment = (id) => {
        removeComment(id);
        // api.comments.remove(id).then((id) => {
        //     setComments(comments.filter((person) => person._id !== id));
        // });
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
                    {sortedComments.length > 0 ? (
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleDeleteComment}
                        />
                    ) : (
                        <h2>Новых комментарий пока нет</h2>
                    )}
                </div>
            </div>
        </>
    );
};

export default Comments;

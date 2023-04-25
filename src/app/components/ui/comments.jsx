import React from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import _ from "lodash";
import CommentsList, { AddCommentForm } from "../common/comments";

const Comments = () => {
    const { paramsId } = useParams();
    const [comments, setComments] = React.useState([]);

    console.log(comments);

    console.log("userId", paramsId);

    React.useEffect(() => {
        api.comments
            .fetchCommentsForUser(paramsId)
            .then((data) => {
                setComments(data);
            })
            .catch((error) => {
                console.error("Ошибка загрузки комментариев:", error);
            });
    }, []);

    const onSubmitForm = (data) => {
        api.comments
            .add({ ...data, pageId: paramsId })
            .then((data) => setComments([...comments, data]));
    };

    const handleDeleteComment = (id) => {
        api.comments.remove(id).then((id) => {
            setComments(comments.filter((person) => person._id !== id));
        });
    };

    const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);

    console.log(sortedComments.length);
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

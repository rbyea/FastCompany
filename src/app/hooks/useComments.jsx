import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const [isLoading, setLoading] = React.useState(true);
    const [comments, setComments] = React.useState([]);
    const [error, setError] = React.useState(null);
    const { paramsId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());

    React.useEffect(() => {
        getComments();
    }, [paramsId]);
    React.useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    async function createComments(data) {
        const comment = {
            ...data,
            pageId: paramsId,
            userId: currentUserId,
            created_at: Date.now(),
            _id: nanoid()
        };

        try {
            const { content } = await commentService.createComment(comment);
            setComments((prevState) => [...prevState, content]);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }

    async function getComments() {
        try {
            const { content } = await commentService.getComments(paramsId);
            setComments(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }

    async function removeComment(id) {
        try {
            const { content } = await commentService.deleteComment(id);
            if (content === null) {
                setComments((prevState) =>
                    prevState.filter((c) => c._id !== id)
                );
            }
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <CommentsContext.Provider
            value={{ comments, createComments, isLoading, removeComment }}
        >
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

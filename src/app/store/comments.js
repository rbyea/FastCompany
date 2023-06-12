import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = true;
        },
        commentCreateReceived: (state, action) => {
            state.entities.push(action.payload);
        },
        commentDeleteReceived: (state, action) => {
            state.entities = state.entities.filter(
                (comment) => comment._id !== action.payload
            );
        }
    }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const {
    commentsReceived,
    commentsRequested,
    commentCreateReceived,
    commentDeleteReceived,
    commentsRequestFailed
} = actions;

const createCommentsRequested = createAction(
    "comments/createCommentsRequested"
);
const deleteCommentRequested = createAction("comments/deleteCommentRequested");

export const loadCommentsList = (pageId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(pageId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const deleteComment = (commentId) => async (dispatch) => {
    dispatch(deleteCommentRequested());
    try {
        const { content } = await commentService.deleteComment(commentId);
        if (content === null) {
            dispatch(commentDeleteReceived(commentId));
        }
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const createCommentPage = (payload) => async (dispatch) => {
    dispatch(createCommentsRequested());
    try {
        const { content } = await commentService.createComment(payload);
        dispatch(commentCreateReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const getCommentsList = () => (state) => state.comments.entities;
export const getLoadingCommentsStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;

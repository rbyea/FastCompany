import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        usersRequested(state) {
            state.isLoading = true;
        },
        usersRequestFailed: (state, action) => {
            state.isLoading = true;
            state.error = action.payload;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        }
    }
});

const { actions, reducer: usersReducer } = usersSlice;
const { usersRequested, usersRequestFailed, usersReceved } = actions;

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        console.log(content);
        dispatch(usersReceved(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const getUsersList = () => (state) => state.users.entities;
export const getLoadingUsersStatus = () => (state) => state.users.isLoading;

export default usersReducer;

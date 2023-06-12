import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import getRandomInt from "../utils/getRandomInt";
import history from "../utils/history";
import { generationAuthError } from "../utils/generateAuthError";

const initialState = localStorageService.getTokenKey()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getLocalIdKey() },
          isLoggedIn: true,
          dataLoader: false,
          filter: null
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoader: false,
          filter: null
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested(state) {
            state.isLoading = true;
        },
        usersRequestFailed: (state, action) => {
            state.isLoading = true;
            state.error = action.payload;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoader = true;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLogOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoader = false;
        },
        userUpdateProfile: (state, action) => {
            console.log(action.payload);
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
            ] = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        },
        usersFiltered: (state, action) => {
            state.filter = state.entities.filter(
                (user) => user.profession === action.payload._id
            );
        },
        usersBookmark: (state, action) => {
            state.entities = state.entities.map((user) => {
                if (user._id === action.payload) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            });
        }
    }
});

const { actions, reducer: usersReducer } = usersSlice;
const {
    usersRequested,
    usersRequestFailed,
    usersReceived,
    authRequestSuccess,
    userLogOut,
    usersFiltered,
    authRequestFailed,
    userCreated,
    userUpdateProfile,
    usersBookmark
} = actions;

const authRequested = createAction("users/authRequested");
const userCreatedRequested = createAction("user/userCreatedRequested");
const createUserFailed = createAction("user/createUserFailed");
const updateUserRequested = createAction("user/updateUserRequested");
const filteredUsersRequested = createAction("user/filteredUsersRequested");

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    password,
                    rate: getRandomInt(1, 5),
                    completedMeetings: getRandomInt(0, 200),
                    image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    ...rest
                })
            );
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };

export const login =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.join({ email, password });
            dispatch(authRequestSuccess({ userId: data.localId }));
            localStorageService.setTokens(data);

            history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;

            if (code === 400) {
                const errorMessage = generationAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(generationAuthError(error.message)));
            }
        }
    };

export const logOut = () => (dispatch) => {
    localStorageService.removeAllKey();
    dispatch(userLogOut());
    history.push("/");
};

function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreatedRequested());
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
            history.push("/users");
        } catch (error) {
            dispatch(createUserFailed(error.message));
        }
    };
}

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const updateUser =
    ({ payload, redirect }) =>
    async (dispatch) => {
        dispatch(updateUserRequested());
        try {
            const { content } = await userService.updateUser(payload);
            dispatch(userUpdateProfile(content));
            history.push(redirect);
        } catch (error) {
            dispatch(usersRequestFailed(error.message));
        }
    };

export const filteredUsers = (payload) => (dispatch) => {
    dispatch(filteredUsersRequested());
    dispatch(usersFiltered(payload));
};

export const userBookmark = (payload) => (dispatch) => {
    dispatch(usersBookmark(payload));
};

export const errorLogin = (payload) => (dispatch) => {
    dispatch(authRequestFailed(payload));
};

export const getUsersList = () => (state) => state.users.entities;
export const getLoadingUsersStatus = () => (state) => state.users.isLoading;
export const getUserId = (id) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((user) => user._id === id);
    }
};
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoader;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((u) => u._id === state.users.auth.userId)
        : null;
};
export const getLoginAuthError = () => (state) => state.users.error;
export const getFilteredUsers = () => (state) => state.users.filter;
export default usersReducer;

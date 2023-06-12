import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";
import proffesionsReducer from "./proffesions";
import usersReducer from "./users";
import commentsReducer from "./comments";

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    proffesions: proffesionsReducer,
    users: usersReducer,
    comments: commentsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}

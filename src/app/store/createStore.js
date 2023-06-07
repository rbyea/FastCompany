import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";
import proffesionsReducer from "./proffesions";
import usersReducer from "./users";

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    proffesions: proffesionsReducer,
    users: usersReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}

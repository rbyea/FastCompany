import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";
import proffesionsReducer from "./proffesions";

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    proffesions: proffesionsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}

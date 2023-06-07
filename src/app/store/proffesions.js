import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/proffession.service";

const proffesionsSlice = createSlice({
    name: "proffesion",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        proffesionReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        proffesionRequested: (state) => {
            state.isLoading = true;
        },
        proffesionRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = true;
        }
    }
});

const { actions, reducer: proffesionsReducer } = proffesionsSlice;
const { proffesionReceved, proffesionRequested, proffesionRequestFailed } =
    actions;
export const loadProffesionsList = () => async (dispatch, getState) => {
    dispatch(proffesionRequested());
    try {
        const { content } = await professionService.get();
        dispatch(proffesionReceved(content));
    } catch (error) {
        dispatch(proffesionRequestFailed(error.message));
    }
};

export const getProffesionsList = () => (state) => state.proffesions.entities;
export const getLoadingProffesionsStatus = () => (state) =>
    state.proffesions.isLoading;
export const getProffesionById = (proffsionId) => (state) => {
    let proffesionArray = {};

    for (const profList of state.proffesions.entities) {
        if (profList._id === proffsionId) {
            proffesionArray = { ...profList };
            break;
        }
    }

    return proffesionArray;
};

export default proffesionsReducer;

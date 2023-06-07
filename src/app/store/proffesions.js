import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/proffession.service";

const proffesionsSlice = createSlice({
    name: "proffesion",
    initialState: {
        entities: [],
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        proffesionReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.lastFetch = Date.now();
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

function isOutDated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadProffesionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().proffesions;
    if (isOutDated(lastFetch)) {
        dispatch(proffesionRequested());
        try {
            const { content } = await professionService.get();
            dispatch(proffesionReceved(content));
        } catch (error) {
            dispatch(proffesionRequestFailed(error.message));
        }
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

    console.log(proffesionArray);

    return proffesionArray;
};

export default proffesionsReducer;

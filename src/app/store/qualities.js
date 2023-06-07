import { createSlice } from "@reduxjs/toolkit";
import qualitieService from "../services/qualitie.service";
import { isOutDated } from "../utils/isOutDate";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: [],
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested(state) {
            state.isLoading = true;
        },
        qualitiesRequestFailed: (state, action) => {
            state.isLoading = true;
            state.error = action.payload;
        },
        qualitiesReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.lastFetch = Date.now();
        }
    }
});

const { actions, reducer: qualitiesReducer } = qualitiesSlice;
const { qualitiesRequested, qualitiesRequestFailed, qualitiesReceved } =
    actions;

export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities;
    if (isOutDated(lastFetch)) {
        dispatch(qualitiesRequested());
        try {
            const { content } = await qualitieService.fetchAll();
            dispatch(qualitiesReceved(content));
        } catch (error) {
            dispatch(qualitiesRequestFailed(error.message));
        }
    }
};

export const getQualitiesList = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
    state.qualities.isLoading;

export const getQualitibyId = (qualitiesId) => (state) => {
    const newArray = [];
    for (const qualId of qualitiesId) {
        for (const quality of state.qualities.entities) {
            if (qualId === quality._id) {
                newArray.push(quality);
                break;
            }
        }
    }

    return newArray;
};

export default qualitiesReducer;

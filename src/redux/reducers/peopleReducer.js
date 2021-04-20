import {
    GET_PEOPLE_REQUESTED,
    GET_PEOPLE_SUCCESS,
    GET_IMG_REQUESTED,
    GET_IMG_SUCCESS,
    PEOPLE_FAILED,
} from '../actions/actionTypes';

const initialState = {
    listPeople: [],
    listImages: [],
    loading: true,
    error: null,
};

export default function peopleReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PEOPLE_REQUESTED:
            return { ...state };
        case GET_PEOPLE_SUCCESS:
            return {
                ...state,
                loading: false,
                listPeople: [...state.listPeople, ...action.payload],
            };
        case GET_IMG_REQUESTED:
            return { ...state };
        case GET_IMG_SUCCESS:
            return {
                ...state,
                loading: false,
                listImages: [...state.listImages, ...action.payload],
            };
        case PEOPLE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message
            };

        default:
            return state;
    }
}
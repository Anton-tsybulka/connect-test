import {
    GET_PEOPLE_REQUESTED,
    GET_PEOPLE_SUCCESS,
    GET_IMG_REQUESTED,
    GET_IMG_SUCCESS,
    CHANGE_INPUTVALUE_REQUESTED,
    CHANGE_INPUTVALUE_SUCCESS,
    PEOPLE_FAILED,
} from '../actions/actionTypes';

const initialState = {
    listPeople: [],
    listImages: [],
    searchListPeople: [],
    searchListImages: [],
    inputValue: '',
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
        case CHANGE_INPUTVALUE_REQUESTED:
            return { ...state };
        case CHANGE_INPUTVALUE_SUCCESS:
            const searchValue = state.listPeople.filter(({ name }) => name.toLowerCase().includes(action.payload.trim().toLowerCase()));
            const searchImages = state.listImages.filter(({ id }) => searchValue.find(item => item.id === id));
            return {
                ...state,
                inputValue: action.payload,
                searchListPeople: [...searchValue],
                searchListImages: [...searchImages],
            };
        case PEOPLE_FAILED:
            console.log(action.message);
            return {
                ...state,
                loading: false,
                error: action.message
            };

        default:
            return state;
    }
}
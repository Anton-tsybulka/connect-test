import {
    GET_PEOPLE_REQUESTED,
    CHANGE_INPUTVALUE_REQUESTED,
} from './actionTypes';

export const getPeople = (data) => {
    return {
        type: GET_PEOPLE_REQUESTED,
        payload: data,
    };
};

export const changeInputValue = (data) => {
    return {
        type: CHANGE_INPUTVALUE_REQUESTED,
        payload: data,
    };
};
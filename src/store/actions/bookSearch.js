import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchBooksStart = () => {
    return {
        type: actionTypes.FETCH_BOOKS_START,
    };
};

export const fetchBooksSuccess = (data) => {
    return {
        type: actionTypes.FETCH_BOOKS_SUCCESS,
        data: data
    };
};

export const fetchBooksFail = (error) => {
    return {
        type: actionTypes.FETCH_BOOKS_FAIL,
        error: error
    };
};

export const fetchBooks = (query) => {
    return dispatch => {
        dispatch(fetchBooksStart());
        axios.get('http://book-tracker-orch1-brave-elephant.mybluemix.net/api/search/' + query)
            .then(response => {
                if(response.data.success) {
                    dispatch(fetchBooksSuccess(response.data.data));
                }
                else {
                    dispatch(fetchBooksFail(response.data.message));
                }
            })
            .catch(err => {
                dispatch(fetchBooksFail(err.message));
            });
    };
};


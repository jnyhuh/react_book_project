import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: [],
    loading: false,
    error: null,
}

const fetchBooksStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
    }
};

const fetchBooksSuccess = (state, action) => {
    return {
        ...state,
        loading: false, 
        data: action.data,
        error: null,
    }
};

const fetchBooksFail = (state, action) => {
    return {
        ...state,
        loading: false,
        data: [],
        error: action.error,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BOOKS_START: return fetchBooksStart(state, action);
        case actionTypes.FETCH_BOOKS_SUCCESS: return fetchBooksSuccess(state, action);
        case actionTypes.FETCH_BOOKS_FAIL: return fetchBooksFail(state, action);
        default: return state;
    }
};

export default reducer;
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: [],
    loading: false,
    error: null,
    user: null,
}

const fetchUserStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
    }
};

const fetchUserSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        user: action.user,
        error: null,
    }
};

const fetchUserFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
    }
};

const fetchFavBooksStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
    }
};

const fetchFavBooksSuccess = (state, action) => {
    return {
        ...state,
        loading: false, 
        data: action.data,
        error: null,
    }
};

const fetchFavBooksFail = (state, action) => {
    return {
        ...state,
        loading: false,
        data: [],
        error: action.error,
    }
}

const addFavBooksStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
    }
};

const addFavBooksSuccess = (state, action) => {
    return {
        ...state,
        loading: false, 
        data: action.data,
        error: action.error,
    }
};

const addFavBooksFail = (state, action) => {
    return {
        ...state,
        loading: false,
        data: [],
        error: action.error,
    }
}

const deleteFavBooksStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
    }
};

const deleteFavBooksSuccess = (state, action) => {
    return {
        ...state,
        loading: false, 
        data: action.data,
        error: action.error,
    }
};

const deleteFavBooksFail = (state, action) => {
    return {
        ...state,
        loading: false,
        data: [],
        error: action.error,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_START: return fetchUserStart(state, action);
        case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
        case actionTypes.FETCH_USER_FAIL: return fetchUserFail(state, action);
        case actionTypes.FETCH_FAVORITE_BOOKS_START: return fetchFavBooksStart(state, action);
        case actionTypes.FETCH_FAVORITE_BOOKS_SUCCESS: return fetchFavBooksSuccess(state, action);
        case actionTypes.FETCH_FAVORITE_BOOKS_FAIL: return fetchFavBooksFail(state, action);
        case actionTypes.ADD_FAVORITE_BOOKS_START: return addFavBooksStart(state, action);
        case actionTypes.ADD_FAVORITE_BOOKS_SUCCESS: return addFavBooksSuccess(state, action);
        case actionTypes.ADD_FAVORITE_BOOKS_FAIL: return addFavBooksFail(state, action);
        case actionTypes.DELETE_FAVORITE_BOOKS_START: return deleteFavBooksStart(state, action);
        case actionTypes.DELETE_FAVORITE_BOOKS_SUCCESS: return deleteFavBooksSuccess(state, action);
        case actionTypes.DELETE_FAVORITE_BOOKS_FAIL: return deleteFavBooksFail(state, action);
        default: return state;
    }
};

export default reducer;
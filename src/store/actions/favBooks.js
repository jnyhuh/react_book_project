import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchFavBooksStart = () => {
    return {
        type: actionTypes.FETCH_FAVORITE_BOOKS_START,
    };
};

export const fetchFavBooksSuccess = (data) => {
    return {
        type: actionTypes.FETCH_FAVORITE_BOOKS_SUCCESS,
        data: data
    };
};

export const fetchFavBooksFail = (error) => {
    return {
        type: actionTypes.FETCH_FAVORITE_BOOKS_FAIL,
        error: error
    };
};

export const addFavBooksStart = () => {
    return {
        type: actionTypes.ADD_FAVORITE_BOOKS_START,
    };
};

export const addFavBooksSuccess = (data, error) => {
    return {
        type: actionTypes.ADD_FAVORITE_BOOKS_SUCCESS,
        data: data,
        error: error,
    };
};

export const addFavBooksFail = (error) => {
    return {
        type: actionTypes.ADD_FAVORITE_BOOKS_FAIL,
        error: error,
    };
};

export const deleteFavBooksStart = () => {
    return {
        type: actionTypes.DELETE_FAVORITE_BOOKS_START,
    };
};

export const deleteFavBooksSuccess = (data, error) => {
    return {
        type: actionTypes.DELETE_FAVORITE_BOOKS_SUCCESS,
        data: data,
        error: error,
    };
};

export const deleteFavBooksFail = (error) => {
    return {
        type: actionTypes.DELETE_FAVORITE_BOOKS_FAIL,
        error: error,
    };
};

export const fetchFavBooks = (username) => {
    return dispatch => {
        dispatch(fetchFavBooksStart());
        const url = 'http://book-tracker-orch1-brave-elephant.mybluemix.net/api/favorites/' + username;
        axios(
        {
            url: url,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'test_token',
            },
        })
            .then(response => {
                if(response.statusText === "OK") {
                    dispatch(fetchFavBooksSuccess(response.data.body));
                    console.log(response.data.body)
                }
                else {
                    dispatch(fetchFavBooksFail(response.data.message));
                    console.log(response)
                }
            })
            .catch(err => {
                dispatch(fetchFavBooksFail(err.message));
                console.log(err)
            });
    };
};

export const addFavBooks = (username, isbn, title, author) => {
    return dispatch => {
        dispatch(addFavBooksStart());
        const url = 'http://book-tracker-orch1-brave-elephant.mybluemix.net/api/favorites/' + username;
        axios(
            {
                url: url,
                method: 'post',
                data: {
                    "isbn": isbn,
                    "title": title,
                    "author": author
                },
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': 'test_token',
                },
            }).then(response => {
                if(response.data.success) {
                    dispatch(addFavBooksSuccess(response.data.body));
                }
                else {
                    dispatch(addFavBooksFail(response.data.message));
                }
            })
            .catch(err => {
                dispatch(addFavBooksFail(err.message));
            });
    };
};

export const deleteFavBooks = (username, isbn) => {
    return dispatch => {
        dispatch(deleteFavBooksStart());
        const url = 'http://book-tracker-orch1-brave-elephant.mybluemix.net/api/favorites/' + username;
        axios(
            {
                url: url,
                method: 'delete',
                // data: {
                //     "isbn": isbn
                // },
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': 'test_token',
                },
            }).then(response => {
                if(response.statusText === "OK") {
                    console.log('deleted books')
                }
                else {
                    console.log('failed to delete books')
                }
            }).then(dispatch(fetchFavBooks(username)))
            .catch(err => {
                console.log('error', err)
            });
        };
};


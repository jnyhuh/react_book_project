import * as actionTypes from './actionTypes';
import axios from 'axios';
import auth0Client from '../../Auth';

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

export const fetchUserStart = () => {
    return {
        type: actionTypes.FETCH_USER_START
    }
}

export const fetchUserSuccess = (user) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        user: user
    }
}

export const fetchUserFail = () => {
    return {
        type: actionTypes.FETCH_USER_FAIL
    }
}

export const fetchUser = () =>{
    return dispatch => {
        dispatch(fetchUserStart())
        if (auth0Client.isAuthenticated)
        {
            const user = auth0Client.getProfile().name
            dispatch(fetchUserSuccess(user))
        }
        else {
            dispatch(fetchUserFail())
        }
    }
}

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

export const addFavBooks = (username, isbn, author, title, publisher, publication_date) => {
    return dispatch => {
        dispatch(addFavBooksStart());
        const url = 'http://book-tracker-orch1-brave-elephant.mybluemix.net/api/favorites/' + username;
        axios(
            {
                url: url,
                method: 'post',
                data: {
                    "isbn": isbn,
                    "author": author,
                    "title": title,
                    "publisher": publisher,
                    "publication_date": publication_date
                
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
                data: {
                    "isbn": isbn
                },
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': 'test_token',
                },
            })
            .then(response => {
                if(response.statusText === "OK") {
                    console.log('deleted books', isbn)
                    dispatch(fetchFavBooks(username))
                }
                else {
                    console.log('failed to delete books')
                }
            })
            .catch(err => {
                console.log('error', err)
            });
        };
};


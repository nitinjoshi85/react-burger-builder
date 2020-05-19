import * as actionTypes from './actionTypes';
import axios from 'axios';

import * as config from './config';
import Utility from '../../Utility/utility';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    }
}

export const authenticate = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let key = config.API_KEY;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+key;
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+key;
        }
        axios.post(url, authData).then(response => {
            dispatch(authSuccess(response.data));    
            dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
        })
        .catch(error => {
            // map error message codes with message.
            dispatch(authFail(error.response.data.error));
        });
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = Utility.getFromLocalStorage('token');
        if (!token) {
            // logout
            dispatch(logout());
        } else {
            const userId = Utility.getFromLocalStorage('userId');
            const expirationTime = Number(Utility.getFromLocalStorage('expirationTime'));
            if (expirationTime <= new Date().getTime()) {
                dispatch(logout());
            }
            const expiresInMillis = (expirationTime - new Date().getTime());
            dispatch(authSuccess({
                idToken: token,
                localId: userId,
                expiresIn: expiresInMillis/1000
            }));    
            dispatch(checkAuthTimeout(expiresInMillis));
        }
    }
}

export const authRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        redirectPath: path
    }
}
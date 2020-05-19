import * as actionTypes from '../actions/actionTypes';
import Utility from '../../Utility/utility';

const initialState = {
    token: null,
    userId: null,
    userEmailAddress: null,
    error: null,
    loading: false,
    loggedOut: false,
    authRedirectPath: '/'
};

const authStart = (state, action) => {
    return Utility.updateObject(state, {loading: true, error: null, loggedOut: false});
};

const authSuccess = (state, action) => {
    const authData = action.authData;
    const expirationTime = new Date().getTime() + (Number(authData.expiresIn) * 1000);
    Utility.setInLocalStorage('token', authData.idToken);
    Utility.setInLocalStorage('userId', authData.localId);
    Utility.setInLocalStorage('expirationTime', expirationTime);
    
    return Utility.updateObject(state, {
        loading: false, 
        error: null, 
        loggedOut: false,
        token: authData.idToken, 
        userId: authData.localId
    });
};

const authFail = (state, action) => {
    return Utility.updateObject(state, {loading: false, error: action.error});
};

const authLogout = (state, action) => {
    Utility.removeFromLocalStorage('expirationTime');
    Utility.removeFromLocalStorage('token');
    Utility.removeFromLocalStorage('userId');
    return Utility.updateObject(state, {token: null, userId: null, loggedOut: true});
}

const authRedirectPath = (state, action) => {
    return Utility.updateObject(state, {authRedirectPath: action.redirectPath});
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:return authLogout(state, action);
        case actionTypes.AUTH_REDIRECT_PATH: return authRedirectPath(state, action);
        default: return state;
    }
}

export default authReducer;
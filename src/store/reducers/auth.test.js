import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
                token: null,
                userId: null,
                userEmailAddress: null,
                error: null,
                loading: false,
                loggedOut: false,
                authRedirectPath: '/'            
        })
    });

    xit('should store user token on login', () => {
        expect(reducer({
            token: null,
            userId: null,
            userEmailAddress: null,
            error: null,
            loading: false,
            loggedOut: false,
            authRedirectPath: '/'            
        }, {
            type: actionTypes.AUTH_SUCCESS,
            authData: {
                idToken: 'some-tokne',
                localId: 'some-user-id'
            }
        })).toEqual({
                token: 'some-tokne',
                userId: 'some-user-id',
                userEmailAddress: null,
                error: null,
                loading: false,
                loggedOut: false,
                authRedirectPath: '/'            
        })
    })
})
import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';


describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should return store the token when login', () => {
        expect(reducer(
            {
                token: null,
                userId: null,
                error: null,
                loading: true,
                authRedirectPath: '/'
            },
            {
                type: actionTypes.AUTH_SUCCESS,
                token: 'token',
                userId: 'userId'
            })).toEqual({
                token: 'token',
                userId: 'userId',
                error: null,
                loading: false,
                authRedirectPath: '/'
            });
    });
});
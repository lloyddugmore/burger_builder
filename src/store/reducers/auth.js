import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: null,
    loading: false,
    idToken: null,
    userid: null,
    authRedirectPath: '/',
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                idToken: action.idToken,
                userId: action.userId
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                idToken: null,
                userId: null
            };
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath: action.path
            };
        default:
            return state;
    };
};

export default reducer;
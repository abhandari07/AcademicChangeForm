// Import custom components
import {
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE, LOG_OUT_SUCCESS, SIGN_UP_FAILURE
} from '../constants/actionType';

var initialState = {
    token: null,
    isAuthenticated: false,
    isLoading: false
};

/**
 * A reducer takes two arguments, the current state and an action.
 */
const authReducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case LOG_IN_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: true,
                isLoading: false,
                token: action.data,
            });

        case SIGN_UP_FAILURE:
            return Object.assign({}, state, {
                isAuthenticated: false,
                isLoading: false,
                token: null,
                errorMessage: action.error.message || 'Email Already Exists'
            });

        case LOG_OUT_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: false,
                isLoading: true,
                token: null,
            });

        case LOG_IN_FAILURE:
                return Object.assign({}, state, {
                    isAuthenticated: false,
                    isLoading: false,
                    token: null,
                    errorMessage: action.error.message || 'Something went wrong.'
                });
    

        default:
            return state;
    }
};

export default authReducer;
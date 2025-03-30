// Define action types as constants
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
const SIGNUP_REJECT = "SIGNUP_REJECT";
const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
const SIGNIN_REJECT = "SIGNIN_REJECT";
const LOGOUT = "LOGOUT";
const LOADING = "LOADING";

const initialState = {
    user: null,
    isCreated: false,
    error: null,
    isLoading: false,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isCreated: true,
                isLoading: false,  // Stop loading
                error: null,       // Clear previous errors
            };
        case SIGNUP_REJECT:
            return {
                ...state,
                error: action.payload,
                isCreated: false,
                isLoading: false,  // Stop loading
            };
        case SIGNIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoading: false,  // Stop loading
                error: null,
            };
        case SIGNIN_REJECT:
            return {
                ...state,
                error: action.payload,
                user: null,
                isLoading: false,  // Stop loading
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                isLoading: false,  // Ensure loading is reset
                error: null,       // Clear errors on logout
                isCreated: false,  // Reset signup state
            };
        default:
            return state;
    }
};

let user = JSON.parse(localStorage.getItem('user'));
const initState = user ? { loggedIn: true, user } : {};

export function authentication(state = initState, action) {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return {
                loggedIn: false,
                user: action.user
            };
        case "LOGIN_SUCCESS":
            return {
                loggedIn: true,
                user: action.user
            };
        case "LOGIN_FAILURE":
            return {};
        case "LOGOUT":
            return {};
        default:
            return state;
    }
}
import history from '../helpers/history';
import { userService } from '../services/user_service';

export const increment = () => {
    return {
        type: "INCREMENT"
    }
}


export const fetchData = () => {
    return (dispatch) => {
        return fetch("http://desktop-hv2qoiv:3000/players")
            .then(res => {
                //console.log(res);
                return res.json()
            })
            .then(json => dispatch(
                {type: "FETCH_DATA", data: json}))
            .catch(err => dispatch(
                { type: "ERROR", msg: "Unable to fetch data "}))
    }
}


export const userActions = {
    login,
    logout,
    register
};


function login(username, password) {
    
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(user => {
                dispatch(success(user));
                history.push('/home');
            },
                error => {
                    dispatch(failure(error.toString()));
                }
        );
    };

    function request(user) { return { type: "LOGIN_REQUEST", user } }
    function success(user) { return { type: "LOGIN_SUCCESS", user } }
    function failure(error) { return { type: "LOGIN_FAILURE", error } }
}

function logout() {
    userService.logout();
    return { type: "LOGOUT" };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(user => {
                dispatch(success());
                history.push('/signin');
            });
    };

    function request(user) { return { type: "REGISTER_REQUEST" } }
    function success(user) { return { type: "REQUEST_SUCCESS" } }
    function failure(error) { return { type: "REQUEST_FAILURE" } }

}


import history from '../helpers/history';
import { userService } from '../services/user_service';
import formatData from '../helpers/formatData';
import formatTeamData from '../helpers/formatTeamData';




function fetchDataPending() {
    return {
        type: "FETCH_DATA_PENDING"
    }
}


function fetchplayerDataSuccess(playerData) {
    return {
        type: "FETCH_PLAYER_DATA_SUCCESS",
        playerData: playerData
    }
}

function fetchteamDataSuccess(teamData) {
    return {
        type: "FETCH_TEAM_DATA_SUCCESS",
        teamData: teamData
    }
}

function fetchDataError(error) {
    return {
        type: "FETCH_DATA_ERROR",
        error: error
    }
}


export const fetchData = () => {
    return (dispatch) => {
       return fetch("http://desktop-hv2qoiv:3000/players")
            .then(res => {
                return res.json();
            })
            .then(body => dispatch(
                {type: "FETCH_PLAYER_DATA_SUCCESS", playerData: body.recordset}))
            .catch(err => dispatch(
                { type: "ERROR", msg: "Unable to fetch data 1"}))
            .then(() => {
                fetch("http://desktop-hv2qoiv:3000/teams")
                    .then(res => {
                        return res.json();
                    })
                    .then(body => dispatch(
                        { type: "FETCH_TEAM_DATA_SUCCESS", teamData: body.recordset}
                    ))
                    .catch(err => dispatch(
                        {type: "ERROR", msg: "Unable to fetch data 2"}))
            })
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


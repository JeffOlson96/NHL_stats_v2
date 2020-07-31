const initialState = {
    playerData: null,
    teamData: null,
    error: "",
    pending: null
}

const reducer = (state = initialState, action) => {
    //console.log("reducer: ", state);
    switch (action.type) {
        case "FETCH_DATA_PENDING":
            return {...state, pending: true}
        case "FETCH_PLAYER_DATA_SUCCESS":
            return {...state, playerData: action.playerData, pending: true }
        case "FETCH_TEAM_DATA_SUCCESS":
            return {...state, teamData: action.teamData, pending: false }
        case "ERROR":
            return {...state, error: action.msg, pending: null }    
        default:
            return state
    }
};

export default reducer;

export const getPlayerData = state => state.playerData;
export const getTeamData = state => state.teamData;
export const getDataPending = state => state.pending;
export const getDataError = state => state.error;

const initialState = {
    data: null,
    error: "",
    num: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, num: state.num + 1 }
        case "FETCH_DATA":
            return {...state, data: action.data }
        case "ERROR":
            return {...state, error: action.msg }    
        default:
            return state
    }
};

export default reducer;

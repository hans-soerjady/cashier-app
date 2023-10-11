const INITIAL_STATE = {
    username: "",
    password: "",
    role: "",
}


// PENULISAN LAMA
export const accountReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, username: action.payload.username, password: action.payload.password, role: "admin" };

        case "LOGOUT":
            return INITIAL_STATE;
            
        default:
            return state;
    }
};
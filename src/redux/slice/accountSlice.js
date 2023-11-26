import { createSlice } from "@reduxjs/toolkit";
import { API_CALL } from "../../helper";

const accountSlice = createSlice({
    name: "account",
    initialState: {
        username: "",
        password: "",
        role: "admin"
    },
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username
        },

        logout: (state, action) => {
            state = {
                username: "",
                password: "",
                role: "admin"
            }
        }
    }
})

export const { login, logout } = accountSlice.actions
export default accountSlice.reducer;


// MIDDLEWARE
export const checkLogin = (data) => {
    return async (dispatch) => {
        try {
            const res = await API_CALL.post(`/account/keepLogin`, null, { headers: { authorization: `Bearer ${data}` } })
            localStorage.setItem("token", res.data.result.token)
            dispatch(login(res.data.result))
        } catch (error) {
            localStorage.removeItem("token")
            console.log(error);
        }
    }
}
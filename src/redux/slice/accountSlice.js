import { createSlice } from "@reduxjs/toolkit";
import { API_CALL } from "../../helper";
import { useNavigate } from "react-router-dom";

const accountSlice = createSlice({
    name: "account",
    initialState: {
        username: "",
        password: "",
        role: "admin"
    },
    reducers: {
        login: (state, action) => {
            console.log("masuk action login", action.payload);
            state.username = action.payload.username
            state.password = action.payload.password
            state.role = action.payload.role
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
            const res = await API_CALL.get(`/account?username=${data.username}&password=${data.password}`)
            if (res.data.length) {
                console.log("menemukan account di database", res.data);
                dispatch(login(res.data[0]))
            } else {
                console.log("TIDAK MENEMUKAN", res.data);
                localStorage.removeItem("auth")
            }
        } catch (error) {
            console.log(error);
        }
    }
}
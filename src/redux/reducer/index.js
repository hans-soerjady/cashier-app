import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./accountReducer";
import { cartReducer } from "./cartReducer";

const globalState = configureStore({
    reducer: {
        accountReducer,
        cartReducer
    }
})

export default globalState;
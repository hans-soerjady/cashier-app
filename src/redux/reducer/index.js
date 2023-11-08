import { configureStore } from "@reduxjs/toolkit";
// import { accountReducer } from "./accountReducer";
// import { cartReducer } from "./cartReducer";

import accountReducer from "../slice/accountSlice"
import cartReducer from "../slice/cartSlice"
import productReducer from "../slice/productSlice"

const globalState = configureStore({
    reducer: {
        accountReducer,
        cartReducer,
        productReducer,
    }
})

export default globalState;
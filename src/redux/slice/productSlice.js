import { createSlice } from "@reduxjs/toolkit";
import { API_CALL } from "../../helper"


const productSlice = createSlice({
    name: "product",
    initialState: {
        products: []
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        }
    }
})

export const { setProducts } = productSlice.actions
export default productSlice.reducer

// Middleware
export const getProducts = (query = "") => {

    return async (dispatch) => {
        try {
            const resGET = await API_CALL.get(`/product${query}`)
            dispatch(setProducts(resGET.data))
        } catch (error) {
            console.log(error);
        }
    }
}
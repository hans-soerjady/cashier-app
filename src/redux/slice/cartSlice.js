import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            let index = state.findIndex((value) => { return value.id === action.payload.id })
            if (index === -1) { state.push({ ...action.payload, qty: 1 }) }
            else { state[index].qty += 1 }
        },

        deleteCart: (state, action) => {
            let index = state.findIndex((value) => { return value.id === action.payload.id })
            state[index].qty -= 1
            if (state[index].qty === 0) { state.splice(index, 1) }
        }
    }
})

export const { addToCart, deleteCart } = cartSlice.actions
export default cartSlice.reducer;
export const addToCartAction = (data) => {
    return {
        type: "addToCart",
        payload: data,
    }
}

export const deleteCartAction = (data) => {
    return {
        type: "deleteCart",
        payload: data,
    }
}
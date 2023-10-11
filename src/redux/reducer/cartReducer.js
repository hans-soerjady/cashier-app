const INITIAL_STATE = [{
    id: "",
    name: "",
    price: 0,
    img: "",
    qty: 0,
}]

export const cartReducer = (state = [], action) => {
    let temp = [...state]
    let index = temp.findIndex((value) => { return value.id === action.payload.id })

    switch (action.type) {
        case "addToCart":
            if (index === -1) {
                return [...temp, { ...action.payload, qty: 1, }]
            } else {
                temp[index] = { ...temp[index], qty: temp[index].qty + 1 }
                return temp
            }

        case "deleteCart":
            temp[index] = { ...temp[index], qty: temp[index].qty - 1 }
            if (temp[index].qty === 0) { temp.splice(index, 1) }
            return temp

        default:
            return state
    }
}
export const loginAction = (data) => {
    console.log("MASUK KE ACTION LOGIN", data);
    return {
        type: "LOGIN",
        payload: data,
    }
}

export const logoutAction = () => {
    console.log("MASUK KE ACTION LOGOUT")
    return { type: "LOGOUT", }
}
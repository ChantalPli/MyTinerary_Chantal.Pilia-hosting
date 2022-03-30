const initialState = {
    message: null,
    user: null, // null/ para poder establecer un valor de renderizado
    snackbar: {
        view: false,
        message: '',
        success: false
    },
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'user': ///
            return {
                ...state,
                user: action.payload,
            }
        case 'message':
            return {
                ...state,
                snackbar: action.payload,
            }
        case 'user/signout':
            return {
                ...state,
                user: null
            }
        default:
            return state
    }

}
export default userReducer














//ESTE ESTA CON EL LOCALSTORAGE

// const userReducer = (state = initialState, action) => {

//     switch (action.type) {

//         case 'user/signin':
//             localStorage.setItem("user", JSON.stringify(action.payload))
//             //guarda el usuario en formato json en localstorage
//             return {
//                 ...state,
//                 snackbar: action.payload,   // user: action.payload,
//             }
//         case 'user/signout':
//             localStorage.setItem("user", null)
//             return {
//                 ...state,
//                 user: null
//             }
//         default:
//             return state
//     }
// }
// export default userReducer
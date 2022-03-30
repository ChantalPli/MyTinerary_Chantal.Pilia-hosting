import { ContentPasteSearchOutlined } from '@mui/icons-material'
import axios from 'axios'


import { url } from '../../api'

const userActions = {

    signUpUser: (userData) => {
        return async (dispatch, getstate) => {

            const res = await axios.post('http://localhost:4000/api/auth/signup', { userData })

            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            });

        }
    },

    signInUser: (loggedUser) => {   //una vez que la funcion va a entrar va a ser llamada por loggeduser, recibe el valor del usuario que quiere hacer le login y hace un return,utiliza un dispatch
        return async (dispatch, getState) => {
            const user = await axios.post(url + '/api/auth/signin', { loggedUser }) //la const user va a ser = a la espera del llamado de la ruta que establecimos, y le pasamos en el cuerpo el valor que esta funcion recibe del usuario que hizo el logueo{loggedUser}
            if (user.data.success) {
                localStorage.setItem("token", user.data.response.token); //si es positiva setea un token en el localstorage
                dispatch({ // y hace dispatch al user con nuevo user
                    type: 'user',
                    payload: user.data.response.userData // los definimos en nuestro controller!
                });
            }
            dispatch({  //si no es success otro mensaje 
                type: 'message',
                payload: {
                    view: true,
                    message: user.data.message,
                    success: user.data.success
                }
            });
        }
    },

    signOutUser: (closeuser) => {
        return async (dispatch, getState) => {
            const user = await axios.post(url + '/api/auth/signout', { closeuser })
            if (user.data.success) {
                localStorage.removeItem("token");
                dispatch({ type: 'user/signout', payload: user.data.response.userData });
            }
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: user.data.message,
                    success: user.data.success
                }
            });
        }
    },

    VerificarToken: (token) => {
        return async (dispatch, getState) => {
            console.log(token)
            const user = await axios.get('http://localhost:4000/api/auth/signInToken', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            if (user.data.success) {
                console.log(user)
                dispatch({ type: 'user', payload: user.data.response });
            } else {
                localStorage.removeItem('token')
            }
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: user.data.message,
                    success: user.data.success
                }
            });
        }
    }
}

export default userActions;
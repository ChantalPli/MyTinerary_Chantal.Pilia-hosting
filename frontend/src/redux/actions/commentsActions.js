import axios from 'axios';



/////questa esta en cityaction ahora!!/////

const commentsActions = {

    addComment: (comment) => {

        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const res = await axios.post('https://mytinerary-pilia.herokuapp.com/api/places/comment', { comment }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return res
        }
    },
    modifyComment: (comment) => {

        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const res = await axios.put('https://mytinerary-pilia.herokuapp.com/places/comment', { comment }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })

            return res
        }
    },
    deleteComment: (id) => {

        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const res = await axios.post(`https://mytinerary-pilia.herokuapp.com/api/places/comment/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return res
        }
    },

}

export default commentsActions;
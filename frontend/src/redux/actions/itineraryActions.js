import api from '../../api';
import axios from 'axios';

const itineraryAction = {

    likeDislike: (itineraryId) => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            try {
                let response = await axios.put(`${api.url}/api/itineraries/like/${itineraryId}`, {},
                    {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    })
                if (response.data.success) {
                    dispatch({ type: "likeDislike", payload: { itineraryId, likes: response.data.response } })
                }
            } catch (error) {
            }
        }
    },

    addComment: (itinerary, comment) => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            try {
                let response = await axios.post(`${api.url}/api/itineraries/comment`, { itinerary, comment }, //
                    {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    })
                if (response.data.success) {
                    dispatch({ type: "comment", payload: { itinerary, comments: response.data.response } })
                }
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: response.data.message,
                        success: response.data.success
                    }
                });
            } catch (error) {
            }
        }
    },
    modifyComment: (itinerary, commentID, comment) => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            try {
                let response = await axios.put(`${api.url}/api/itineraries/comment`, { commentID, comment },
                    {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    })
                if (response.data.success) {
                    dispatch({ type: "comment", payload: { itinerary, comments: response.data.response } })// actualizamos la lista de comentarios
                }
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: response.data.message,
                        success: response.data.success
                    }
                });
            } catch (error) {
            }
        }
    },
    deleteComment: (itinerary, commentID) => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            try {
                let response = await axios.post(`${api.url}/api/itineraries/comment/${commentID}`, {},
                    {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    })
                if (response.data.success) {
                    dispatch({ type: "comment", payload: { itinerary, comments: response.data.response } })
                }
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: response.data.message,
                        success: response.data.success
                    }
                });
            } catch (error) {
            }
        }
    }

};

export default itineraryAction;
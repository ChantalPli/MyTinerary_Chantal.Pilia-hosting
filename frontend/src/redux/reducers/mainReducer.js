import { combineReducers } from 'redux';
import citiesReducer from './citiesReducer';
// import authReducer from './authReducer';
import userReducer from './userReducer'

const mainReducer = combineReducers({
    citiesReducer,
    userReducer,
    // authReducer
})

export default mainReducer;
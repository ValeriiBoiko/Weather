import { combineReducers } from "redux";
import weatherReducer from './weather';
import locationReducer from './location';
import appReducer from './app';

export default combineReducers({
    weather: weatherReducer,
    location: locationReducer,
    app: appReducer
})
import {combineReducers} from 'redux';
import counterReducer from "./imageReducer";

const rootReducer = combineReducers({
    counter: counterReducer
});

export default rootReducer;
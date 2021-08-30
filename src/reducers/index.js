import { combineReducers } from 'redux';

import Places from './places'

const reducers = combineReducers({
    allPlaces: Places
})

export default reducers;
import { combineReducers } from 'redux';

import PlacesReducer from './places'
import ProfileReducer from './profile'

const reducers = combineReducers({
    allPlaces: PlacesReducer,
    profile: ProfileReducer,
})

export default reducers;
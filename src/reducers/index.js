import { combineReducers } from 'redux';

import Places from './places'
import Profile from './profile'

const reducers = combineReducers({
    allPlaces: Places,
    profile: Profile,
})

export default reducers;
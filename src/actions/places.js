// ACTIONS IS WHERE YOU CALL APIS AND DO STUFF
import Types from './types';

// GET PLACES
export const getPlaces = (places) => {
    return {
        type: Types.GET_PLACES,
        payload: places
    }
}


// ADD PLACE
export const addNewPlace = (place) => {
    return {
        type: Types.ADD_PLACE,
        payload: place
    }
}

export const addPlaceComplete = () => {
    return {
        type: Types.COMPLETE_ADD_PLACE,
    }
}

export const failedAddPlace = (err) => {
    return {
        type: Types.FAILED_ADD_PLACE,
        payload: err
    }
}
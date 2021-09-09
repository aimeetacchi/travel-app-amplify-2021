// ACTIONS IS WHERE YOU CALL APIS AND DO STUFF
import Types from './types';

// GET PLACES
export const getPlaces = (places) => {
    return {
        type: Types.GET_PLACES,
        payload: places
    }
}

export const errPlaces = (err) => {
    return {
        type: Types.FAILED_GET_PLACES,
        payload: err
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

// Delete Place
export const deleteSelectedPlace = (place) => {
    return {
        type: Types.DELETE_SELECTED_PLACE,
        payload: place
    }
}

export const deletePlaceComplete = () => {
    return {
        type: Types.COMPLETE_DELETE_PLACE,
    }
}

export const failedDeletePlace = (err) => {
    return {
        type: Types.FAILED_DELETE_PLACE,
        payload: err
    }
}
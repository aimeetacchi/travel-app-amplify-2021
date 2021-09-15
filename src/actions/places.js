// ACTIONS IS WHERE YOU CALL APIS AND DO STUFF
import { API, graphqlOperation } from 'aws-amplify'
import { createPlaces } from '../graphql/mutations'
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
export const addNewPlace = (place) => async dispatch => {
    try {                  
        // === Uses the Amplify API category to call the AppSync GraphQL API with the createPlaces mutation. A difference between the listPlaces query and the createPlaces mutation is that createPlaces accepts an argument containing the variables needed for the mutation.
       // Add place to database by calling API
       const placeData = await API.graphql(graphqlOperation(createPlaces, {input: place}))
       dispatch({
            type: Types.ADD_PLACE,
            payload: placeData
       });

    } catch (err) {
        console.log('error creating place:', err)
        // RUN FAIL ACTION ----
        dispatch({
            type: Types.FAILED_ADD_PLACE,
            payload: err
        })
    }
    
}

export const addPlaceComplete = () => {
    return {
        type: Types.COMPLETE_ADD_PLACE,
    }
}

// export const failedAddPlace = (err) => {
//     return {
//         type: Types.FAILED_ADD_PLACE,
//         payload: err
//     }
// }

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
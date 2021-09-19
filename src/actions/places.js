// ACTIONS IS WHERE YOU CALL APIS AND DO STUFF
import { API, graphqlOperation } from 'aws-amplify'
import { listPlaces } from '../graphql/queries'
import { createPlaces, deletePlaces } from '../graphql/mutations'

import Types from './types';

// GET PLACES
export const getPlaces = () => async dispatch => {
    try {
        dispatch(setLoading());  
        // === Uses the Amplify API category to call the AppSync GraphQL API with the listPlaces query. Once the data is returned, the items array is passed in to the setPlaces function to update the local state.
        const placesData = await API.graphql(graphqlOperation(listPlaces))
        const data = placesData.data.listPlaces.items
        dispatch({
            type: Types.GET_PLACES,
            payload: data
        })

        dispatch(getPlacesComplete());
    } catch (err) {
        console.log('error fetching places')
        dispatch({
            type: Types.FAILED_GET_PLACES,
            payload: err.response.data
        }) 
    }  
}

export const getPlacesComplete = () => {
    return {
        type: Types.COMPLETE_GET_PLACES,
    }
}


// ADD PLACE
export const addNewPlace = (place) => async dispatch => {
    try {
        dispatch(setLoading());       
        // === Uses the Amplify API category to call the AppSync GraphQL API with the createPlaces mutation. A difference between the listPlaces query and the createPlaces mutation is that createPlaces accepts an argument containing the variables needed for the mutation.
       // Add place to database by calling API
       const placeData = await API.graphql(graphqlOperation(createPlaces, {input: place}))
        console.log('Place Data', placeData.data.createPlaces)
       dispatch({
            type: Types.ADD_PLACE,
            payload: placeData.data.createPlaces
       });

        dispatch(addPlaceComplete());

    } catch (err) {
        console.log('error creating place:', err)
        // RUN FAIL ACTION ----
        dispatch({
            type: Types.FAILED_ADD_PLACE,
            payload: err
        })
    }
    
}



// Set Loading to True..
export const setLoading = () => {
    return {
        type: Types.SET_LOADING,
    }
}

export const addPlaceComplete = () => {
    console.log('addPlaceComplete action...')
    return {
        type: Types.COMPLETE_ADD_PLACE,
    }
}

// ==== Delete Place
export const deleteSelectedPlace = (deletedPlace) => async dispatch => {

    try {
        const placesData = await API.graphql(graphqlOperation(deletePlaces, {input: deletedPlace}))
        const place = placesData.data.deletePlaces.items

        dispatch({
            type: Types.DELETE_SELECTED_PLACE,
            payload: place
        })

        dispatch(deletePlaceComplete());
    } catch (err) { 
        console.log('error deleting places')
        dispatch({
            type: Types.FAILED_DELETE_PLACE,
            payload: err
        })
    }
    
}

export const deletePlaceComplete = () => {
    return {
        type: Types.COMPLETE_DELETE_PLACE,
    }
}

import Types from '../actions/types';


const initialState = {
    data: [],
    errs: '',
    complete: false,
    newPlace: {}
}

const Places = (state = initialState, {type, payload}) => {
    switch (type) {
        case Types.GET_PLACES:
            return {...state, data: payload }
        case Types.COMPLETE_GET_PLACES:
            return {...state, complete: true}
        case Types.FAILED_GET_PLACES:
            return {...state, errs: payload}
        
        case Types.ADD_PLACE:
            return {...state, newPlace: payload }
        case Types.FAILED_ADD_PLACE:
            return {...state, errs: payload }
        case Types.COMPLETE_ADD_PLACE:
            return {...state, complete: true }
        
        case Types.DELETE_SELECTED_PLACE:
            // checking the payload id passed in with the id in the array of objects and filtering out the one thats true. updates the state.
            return { 
                ...state,
                ...state.data.filter(el => el.id !== payload),
             }
        case Types.FAILED_DELETE_PLACE:
            return { ...state, complete: true }
        case Types.COMPLETE_DELETE_PLACE:
            return { ...state, complete: true }
        default:
            return state;
    }
}

export default Places;
import Types from '../actions/types';


const initialState = {
    data: [],
    errs: '',
    getComplete: false,
    addComplete: false,
    loading: false,
    completeDeletedPlace: false,
    // nextnexttoken: ''
}

const Places = (state = initialState, {type, payload}) => {
    switch (type) {
        case Types.SET_LOADING:
            console.log('running set loading..');
            return {
                ...state,
                loading: true
            }
        case Types.GET_PLACES:
            return {
                ...state,
                data: payload,
                loading: false,
                completeDeletedPlace: false
            }
        case Types.ASC_PLACES:
            return {
                ...state,
                data: payload,
            }
        case Types.DESC_PLACES:
            return {
                ...state,
                data: payload,
            }
        // case Types.SET_NEXTNEXT_TOKEN:
        //     console.log('setting nextnexttoken')
        //     return {
        //         ...state,
        //         nextnexttoken: payload,
        //     }
        case Types.COMPLETE_GET_PLACES:
            console.log('running complete get places..');
            return {
                ...state,
                getComplete: true
            }
        case Types.FAILED_GET_PLACES:
            return {
                ...state,
                errs: payload
            }
       
        case Types.ADD_PLACE:
            return {
                ...state,
                data:[...state.data, payload],
                loading: false
            }
        case Types.COMPLETE_ADD_PLACE:
            return {
                ...state,
                addComplete: true
            }
        case Types.FAILED_ADD_PLACE:
            return {
                ...state,
                errs: payload
            }
        
        case Types.DELETE_SELECTED_PLACE:
            // checking the payload id passed in with the id in the array of objects and filtering out the one thats true. updates the state.
            console.log('running delete selected place in reducer.')
            return { 
                ...state,
                data: state.data.filter(el => el.id !== payload),
                completeDeletedPlace: true,
             }
        case Types.FAILED_DELETE_PLACE:
            return {
                ...state,
                complete: true
            }
        // case Types.COMPLETE_DELETE_PLACE:
        //     return {
        //         ...state,
               
        //     }
        default:
            return state;
    }
}

export default Places;
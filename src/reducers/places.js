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
        case Types.ADD_PLACE:
            return {...state, newPlace: payload }
        case Types.FAILED_ADD_PLACE:
            return {...state, errs: payload }
        case Types.COMPLETE_ADD_PLACE:
            return {...state, complete: true }
        default:
            return state;
    }
}

export default Places;
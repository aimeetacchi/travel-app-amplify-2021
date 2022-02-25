import Types from '../actions/types';


const initialState = {
    data: [],
    errs: '',
    complete: false,
}

const Profile = (state = initialState, {type, payload}) => {
    switch (type) {
        case Types.GET_PROFILE:
            return {
                ...state,
                data: payload
            }
        case Types.COMPLETE_GET_PROFILE:
            return {
                ...state,
                complete: true
            }
        case Types.FAILED_GET_PROFILE:
            return {
                ...state,
                err: payload
            }
        case Types.CREATE_PROFILE:
            return {
                ...state,
                data: payload
            }
        case Types.COMPLETE_CREATE_PROFILE:
            return {
                ...state,
                complete: true
            }
        case Types.FAILED_CREATE_PROFILE:
            return {
                ...state,
                err: payload
            }
        default:
            return state;
    }
}

export default Profile;
import Types from '../actions/types';


const initialState = {
    data: [],
    errs: '',
    complete: false,
}

const Profile = (state = initialState, {type, payload}) => {
    switch (type) {
        case Types.GET_PROFILE:
            return {...state, data: payload }
        default:
            return state;
    }
}

export default Profile;
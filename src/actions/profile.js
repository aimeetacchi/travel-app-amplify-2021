// ACTIONS IS WHERE YOU CALL APIS AND DO STUFF
import Types from './types';


// GET PROFILE
export const getProfile = (places) => {
    return {
        type: Types.GET_PROFILE,
        payload: places
    }
}

export const failedGetProfile = (err) => {
    return {
        type: Types.FAILED_GET_PROFILE,
        payload: err
    }
}

export const completeGetProfile = () => {
    return {
        type: Types.COMPLETE_GET_PROFILE,
    }
}


// CREATING PROFILE
export const createProfile = (profile) => {
    return {
        type: Types.CREATE_PROFILE,
        payload: profile
    }
}

export const createProfileComplete = () => {
    return {
        type: Types.COMPLETE_CREATE_PROFILE,
    }
}

export const failedCreateProfile = (err) => {
    return {
        type: Types.FAILED_CREATE_PROFILE,
        payload: err
    }
}

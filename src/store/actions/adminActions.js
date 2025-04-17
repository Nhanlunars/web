import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService,getAllLocations, createNewLocationService,
    deleteLocationService, editLocationService
} from '../../services/userService';
import { toast } from 'react-toastify';


export const fetchGenderStart = () => {
    return async (dispatch, getstate) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderFailed', e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchRoleStart = () => {
    return async (dispatch, getstate) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleFailed', e)
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await createNewUserService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("create a new user success!");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed', e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getstate) => {
        try {
            let res = await getAllUsers("All");
            if (res && res.errCode === 0) {

                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                toast.error("fetch all user error!");
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("fetch all user error!");

            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFailed', e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})

export const deleteAUser = (userId) => {
    return async (dispatch, getstate) => {
        try {
            let res = await deleteUserService(userId);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("delete the user success!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("delete the user error!");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("delete the user error!");
            dispatch(deleteUserFailed());
            console.log('saveUserFailed', e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await editUserService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("Update the user success!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Update the user error!");
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Update the user error!");
            dispatch(editUserFailed());
            console.log('EditUserFailed', e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})



export const createNewLocation = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await createNewLocationService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("create a new location success!");
                dispatch(saveLocationSuccess());
                dispatch(fetchAllLocationsStart());
            } else {
                dispatch(saveLocationFailed());
            }
        } catch (e) {
            dispatch(saveLocationFailed());
            console.log('saveLocationFailed', e)
        }
    }
}

export const saveLocationSuccess = () => ({
    type: actionTypes.CREATE_LOCATION_SUCCESS
})

export const saveLocationFailed = () => ({
    type: actionTypes.CREATE_LOCATION_FAILED
})

export const fetchAllLocationsStart = () => {
    return async (dispatch, getstate) => {
        try {
            let res = await getAllLocations("All");
            if (res && res.errCode === 0) {

                dispatch(fetchAllLocationsSuccess(res.users.reverse()));
            } else {
                toast.error("fetch all location error!");
                dispatch(fetchAllLocationsFailed());
            }
        } catch (e) {
            toast.error("fetch all location error!");

            dispatch(fetchAllLocationsFailed());
            console.log('fetchAllLocationsFailed', e)
        }
    }
}

export const fetchAllLocationsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_LOCATIONS_SUCCESS,
    locations: data
})

export const fetchAllLocationsFailed = () => ({
    type: actionTypes.FETCH_ALL_LOCATIONS_FAILED,
})

export const deleteALocation = (locationId) => {
    return async (dispatch, getstate) => {
        try {
            let res = await deleteLocationService(locationId);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("delete the location success!");
                dispatch(deleteLocationSuccess());
                dispatch(fetchAllLocationsStart());
            } else {
                toast.error("delete the location error!");
                dispatch(deleteLocationFailed());
            }
        } catch (e) {
            toast.error("delete the location error!");
            dispatch(deleteLocationFailed());
            console.log('saveLocationFailed', e)
        }
    }
}

export const deleteLocationSuccess = () => ({
    type: actionTypes.DELETE_LOCATION_SUCCESS
})

export const deleteLocationFailed = () => ({
    type: actionTypes.DELETE_LOCATION_SUCCESS
})

export const editALocation = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await editLocationService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("Update the location success!");
                dispatch(editLocationSuccess());
                dispatch(fetchAllLocationsStart());
            } else {
                toast.error("Update the location error!");
                dispatch(editLocationFailed());
            }
        } catch (e) {
            toast.error("Update the location error!");
            dispatch(editLocationFailed());
            console.log('editLocationFailed', e)
        }
    }
}

export const editLocationSuccess = () => ({
    type: actionTypes.EDIT_LOCATION_SUCCESS
})

export const editLocationFailed = () => ({
    type: actionTypes.EDIT_LOCATION_FAILED
})


/*
export const createNewLocation = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await createNewLocationService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("create a new location success!");
                dispatch(saveLocationSuccess());
                dispatch(fetchAllLocationsStart());
            } else {
                dispatch(saveLocationFailed());
            }
        } catch (e) {
            dispatch(saveLocationFailed());
            console.log('saveLocationFailed', e)
        }
    }
}

export const saveLocationSuccess = () => ({
    type: actionTypes.CREATE_LOCATION_SUCCESS
})

export const saveLocationFailed = () => ({
    type: actionTypes.CREATE_LOCATION_FAILED
})

export const fetchAllLocationsStart = () => {
    return async (dispatch, getstate) => {
        try {
            let res = await getAllLocations("All");
            if (res && res.errCode === 0) {

                dispatch(fetchAllLocationsSuccess(res.users.reverse()));
            } else {
                toast.error("fetch all location error!");
                dispatch(fetchAllLocationsFailed());
            }
        } catch (e) {
            toast.error("fetch all location error!");

            dispatch(fetchAllLocationsFailed());
            console.log('fetchAllLocationsFailed', e)
        }
    }
}

export const fetchAllLocationsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_LOCATIONS_SUCCESS,
    locations: data
})

export const fetchAllLocationsFailed = () => ({
    type: actionTypes.FETCH_ALL_LOCATIONS_FAILED,
})

export const deleteALocation = (locationId) => {
    return async (dispatch, getstate) => {
        try {
            let res = await deleteLocationService(locationId);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("delete the location success!");
                dispatch(deleteLocationSuccess());
                dispatch(fetchAllLocationsStart());
            } else {
                toast.error("delete the location error!");
                dispatch(deleteLocationFailed());
            }
        } catch (e) {
            toast.error("delete the location error!");
            dispatch(deleteLocationFailed());
            console.log('saveLocationFailed', e)
        }
    }
}

export const deleteLocationSuccess = () => ({
    type: actionTypes.DELETE_LOCATION_SUCCESS
})

export const deleteLocationFailed = () => ({
    type: actionTypes.DELETE_LOCATION_SUCCESS
})

export const editALocation = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await editLocationService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("Update the location success!");
                dispatch(editLocationSuccess());
                dispatch(fetchAllLocationsStart());
            } else {
                toast.error("Update the location error!");
                dispatch(editLocationFailed());
            }
        } catch (e) {
            toast.error("Update the location error!");
            dispatch(editLocationFailed());
            console.log('editLocationFailed', e)
        }
    }
}

export const editLocationSuccess = () => ({
    type: actionTypes.EDIT_LOCATION_SUCCESS
})

export const editLocationFailed = () => ({
    type: actionTypes.EDIT_LOCATION_FAILED
})

*/


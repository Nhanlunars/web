import actionTypes from './actionTypes';
import{
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService,getAllLocations, createNewLocationService,
    deleteLocationService, editLocationService, getAllChargers, createNewChargerService,
    deleteChargerService, editChargerService, getAllTypes, createNewTypeService,
    deleteTypeService, editTypeService, getAllReservations, createNewReservationService,
    deleteReservationService, editReservationService, getAllHistorys, createNewHistoryService,
    deleteHistoryService, editHistoryService, getAllInfos, createNewInfoService,
    deleteInfoService, editInfoService,


}
 from '../../services/userService';
//import index from '../../services';
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
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error(res.errMessage);
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
            toast.error("fetch all user error!!");

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
                dispatch(saveLocationSuccess());
                dispatch(fetchAllLocationsStart());
            } else {
                toast.error(res.errMessage);
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

                dispatch(fetchAllLocationsSuccess(res.locations.reverse()));
            } else {
                toast.error("fetch all location error!!!!");
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
    type: actionTypes.DELETE_LOCATION_FAILED
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
                console.log('editLocationFailed1', res)
            }
        } catch (e) {
            toast.error("Update the location error!!");
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



export const createNewCharger = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await createNewChargerService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("create a new charger success!");
                dispatch(saveChargerSuccess());
                dispatch(fetchAllChargersStart());
            } else {
                toast.error("create a new charger faild!");
                dispatch(saveChargerFailed());
                console.log('createChargerFailed', res)

            }
        } catch (e) {
            dispatch(saveChargerFailed());
            console.log('saveChargerFailed', e)
        }
    }
}

export const saveChargerSuccess = () => ({
    type: actionTypes.CREATE_CHARGER_SUCCESS
})

export const saveChargerFailed = () => ({
    type: actionTypes.CREATE_CHARGER_FAILED
})

export const fetchAllChargersStart = () => {
    return async (dispatch, getstate) => {
        try {
            let res = await getAllChargers("All");
            if (res && res.errCode === 0) {

                dispatch(fetchAllChargersSuccess(res.chargers.reverse()));
            } else {
                toast.error("fetch all charger error!");
                dispatch(fetchAllChargersFailed());
                console.log('fetchAllChargersFailed', res)
            }
        } catch (e) {
            toast.error("fetch all charger error!!");

            dispatch(fetchAllChargersFailed());
            console.log('fetchAllChargersFailed', e)
        }
    }
}

export const fetchAllChargersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CHARGERS_SUCCESS,
    chargers: data
})

export const fetchAllChargersFailed = () => ({
    type: actionTypes.FETCH_ALL_CHARGERS_FAILED,
})

export const deleteACharger = (chargerId) => {
    return async (dispatch, getstate) => {
        try {
            let res = await deleteChargerService(chargerId);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("delete the charger success!");
                dispatch(deleteChargerSuccess());
                dispatch(fetchAllChargersStart());
            } else {
                toast.error("delete the charger error!");
                dispatch(deleteChargerFailed());
            }
        } catch (e) {
            toast.error("delete the charger error!");
            dispatch(deleteChargerFailed());
            console.log('saveChargerFailed', e)
        }
    }
}

export const deleteChargerSuccess = () => ({
    type: actionTypes.DELETE_CHARGER_SUCCESS
})

export const deleteChargerFailed = () => ({
    type: actionTypes.DELETE_CHARGER_FAILED
})

export const editACharger = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await editChargerService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("Update the charger success!");
                dispatch(editChargerSuccess());
                dispatch(fetchAllChargersStart());
            } else {
                toast.error("Update the charger error!");
                dispatch(editChargerFailed());
                console.log('editChargerFailed', res)

            }
        } catch (e) {
            toast.error("Update the charger error!!");
            dispatch(editChargerFailed());
            console.log('editChargerFailed', e)
        }
    }
}

export const editChargerSuccess = () => ({
    type: actionTypes.EDIT_CHARGER_SUCCESS
})

export const editChargerFailed = () => ({
    type: actionTypes.EDIT_CHARGER_FAILED
})

//

export const createNewType = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await createNewTypeService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("create a new type success!");
                dispatch(saveTypeSuccess());
                dispatch(fetchAllTypesStart());
            } else {
                toast.error("create a new type faild!!");
                dispatch(saveTypeFailed());
                console.log('createTypeFailed', res)

            }
        } catch (e) {
            dispatch(saveTypeFailed());
            console.log('saveTypeFailed', e)
        }
    }
}

export const saveTypeSuccess = () => ({
    type: actionTypes.CREATE_TYPE_SUCCESS
})

export const saveTypeFailed = () => ({
    type: actionTypes.CREATE_TYPE_FAILED
})

export const fetchAllTypesStart = () => {
    return async (dispatch, getstate) => {
        try {
            let res = await getAllTypes("All");
            if (res && res.errCode === 0) {

                dispatch(fetchAllTypesSuccess(res.types.reverse()));

            } else {
                toast.error("fetch all type error!");
                dispatch(fetchAllTypesFailed());
                console.log('fetchAllTypesFailed', res)
            }
        } catch (e) {
            toast.error("fetch all type error!!");

            dispatch(fetchAllTypesFailed());
            console.log('fetchAllTypesFailed', e)
        }
    }
}

export const fetchAllTypesSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_TYPES_SUCCESS,
    types: data
})

export const fetchAllTypesFailed = () => ({
    type: actionTypes.FETCH_ALL_TYPES_FAILED,
})

export const deleteAType = (typeId) => {
    return async (dispatch, getstate) => {
        try {
            let res = await deleteTypeService(typeId);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("delete the type success!");
                dispatch(deleteTypeSuccess());
                dispatch(fetchAllTypesStart());
            } else {
                toast.error("delete the type error!");
                dispatch(deleteTypeFailed());
            }
        } catch (e) {
            toast.error("delete the type error!");
            dispatch(deleteTypeFailed());
            console.log('saveTypeFailed', e)
        }
    }
}

export const deleteTypeSuccess = () => ({
    type: actionTypes.DELETE_TYPE_SUCCESS
})

export const deleteTypeFailed = () => ({
    type: actionTypes.DELETE_TYPE_FAILED
})

export const editAType = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await editTypeService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("Update the type success!");
                dispatch(editTypeSuccess());
                dispatch(fetchAllTypesStart());
            } else {
                toast.error("Update the type error!");
                dispatch(editTypeFailed());
                console.log('editTypeFailed', res)

            }
        } catch (e) {
            toast.error("Update the type error!!");
            dispatch(editTypeFailed());
            console.log('editTypeFailed', e)
        }
    }
}

export const editTypeSuccess = () => ({
    type: actionTypes.EDIT_TYPE_SUCCESS
})

export const editTypeFailed = () => ({
    type: actionTypes.EDIT_TYPE_FAILED
})

//
export const createNewReservation = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await createNewReservationService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("create a new reservation success!");
                dispatch(saveReservationSuccess());
                dispatch(fetchAllReservationsStart());
            } else {
                toast.error("create a new reservation faild!!");
                dispatch(saveReservationFailed());
                console.log('createReservationFailed', res)

            }
        } catch (e) {
            dispatch(saveReservationFailed());
            console.log('saveReservationFailed', e)
        }
    }
}

export const saveReservationSuccess = () => ({
    type: actionTypes.CREATE_RESERVATION_SUCCESS
})

export const saveReservationFailed = () => ({
    type: actionTypes.CREATE_RESERVATION_FAILED
})

export const fetchAllReservationsStart = () => {
    return async (dispatch, getstate) => {
        try {
            let res = await getAllReservations("All");
            if (res && res.errCode === 0) {
                dispatch(fetchAllReservationsSuccess(res.reservations.reverse()));
            } else {
                toast.error("fetch all reservation error!");
                dispatch(fetchAllReservationsFailed());
                console.log('fetchAllReservationsFailed', res)
            }
        } catch (e) {
            toast.error("fetch all reservation error!!");

            dispatch(fetchAllReservationsFailed());
            console.log('fetchAllReservationsFailed', e)
        }
    }
}

export const fetchAllReservationsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_RESERVATIONS_SUCCESS,
    reservations: data
})

export const fetchAllReservationsFailed = () => ({
    type: actionTypes.FETCH_ALL_RESERVATIONS_FAILED,
})

export const deleteAReservation = (reservationId) => {
    return async (dispatch, getstate) => {
        try {
            let res = await deleteReservationService(reservationId);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("delete the reservation success!");
                dispatch(deleteReservationSuccess());
                dispatch(fetchAllReservationsStart());
            } else {
                toast.error("delete the reservation error!");
                dispatch(deleteReservationFailed());
            }
        } catch (e) {
            toast.error("delete the reservation error!");
            dispatch(deleteReservationFailed());
            console.log('saveReservationFailed', e)
        }
    }
}

export const deleteReservationSuccess = () => ({
    type: actionTypes.DELETE_RESERVATION_SUCCESS
})

export const deleteReservationFailed = () => ({
    type: actionTypes.DELETE_RESERVATION_FAILED
})

export const editAReservation = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await editReservationService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("Update the reservation success!");
                dispatch(editReservationSuccess());
                dispatch(fetchAllReservationsStart());
            } else {
                toast.error("Update the reservation error!");
                dispatch(editReservationFailed());
                console.log('editReservationFailed', res)

            }
        } catch (e) {
            toast.error("Update the reservation error!!");
            dispatch(editReservationFailed());
            console.log('editReservationFailed', e)
        }
    }
}

export const editReservationSuccess = () => ({
    type: actionTypes.EDIT_RESERVATION_SUCCESS
})

export const editReservationFailed = () => ({
    type: actionTypes.EDIT_RESERVATION_FAILED
})
//
export const createNewHistory = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await createNewHistoryService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("create a new history success!");
                dispatch(saveHistorySuccess());
                dispatch(fetchAllHistorysStart());
            } else {
                toast.error("create a new history faild!!");
                dispatch(saveHistoryFailed());
                console.log('createHistoryFailed', res)

            }
        } catch (e) {
            dispatch(saveHistoryFailed());
            console.log('saveHistoryFailed', e)
        }
    }
}

export const saveHistorySuccess = () => ({
    type: actionTypes.CREATE_HISTORY_SUCCESS
})

export const saveHistoryFailed = () => ({
    type: actionTypes.CREATE_HISTORY_FAILED
})

export const fetchAllHistorysStart = () => {
    return async (dispatch, getstate) => {
        try {
            let res = await getAllHistorys("All");
            if (res && res.errCode === 0) {
                dispatch(fetchAllHistorysSuccess(res.historys.reverse()));
            } else {
                toast.error("fetch all history error!");
                dispatch(fetchAllHistorysFailed());
                console.log('fetchAllHistorysFailed', res)
            }
        } catch (e) {
            toast.error("fetch all history error!!");

            dispatch(fetchAllHistorysFailed());
            console.log('fetchAllHistorysFailed', e)
        }
    } 
}

export const fetchAllHistorysSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_HISTORYS_SUCCESS,
    historys: data
})

export const fetchAllHistorysFailed = () => ({
    type: actionTypes.FETCH_ALL_HISTORYS_FAILED,
})

export const deleteAHistory = (historyId) => {
    return async (dispatch, getstate) => {
        try {
            let res = await deleteHistoryService(historyId);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("delete the history success!");
                dispatch(deleteHistorySuccess());
                dispatch(fetchAllHistorysStart());
            } else {
                toast.error("delete the history error!");
                dispatch(deleteHistoryFailed());
            }
        } catch (e) {
            toast.error("delete the history error!");
            dispatch(deleteHistoryFailed());
            console.log('saveHistoryFailed', e)
        }
    }
}

export const deleteHistorySuccess = () => ({
    type: actionTypes.DELETE_HISTORY_SUCCESS
})

export const deleteHistoryFailed = () => ({
    type: actionTypes.DELETE_HISTORY_FAILED
})

export const editAHistory = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await editHistoryService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("Update the history success!");
                dispatch(editHistorySuccess());
                dispatch(fetchAllHistorysStart());
            } else {
                toast.error("Update the history error!");
                dispatch(editHistoryFailed());
                console.log('editHistoryFailed', res)

            }
        } catch (e) {
            toast.error("Update the history error!!");
            dispatch(editHistoryFailed());
            console.log('editHistoryFailed', e)
        }
    }
}

export const editHistorySuccess = () => ({
    type: actionTypes.EDIT_HISTORY_SUCCESS
})

export const editHistoryFailed = () => ({
    type: actionTypes.EDIT_HISTORY_FAILED
})
//

export const createNewInfo = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await createNewInfoService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("create a new history success!");
                dispatch(saveInfoSuccess());
                dispatch(fetchAllInfosStart());
            } else {
                toast.error("create a new history faild!!");
                dispatch(saveInfoFailed());
                console.log('createInfoFailed', res)

            }
        } catch (e) {
            dispatch(saveInfoFailed());
            console.log('saveInfoFailed', e)
        }
    }
}

export const saveInfoSuccess = () => ({
    type: actionTypes.CREATE_INFO_SUCCESS
})

export const saveInfoFailed = () => ({
    type: actionTypes.CREATE_INFO_FAILED
})

export const fetchAllInfosStart = () => {
    return async (dispatch, getstate) => {
        try {
            let res = await getAllInfos("All");
            if (res && res.errCode === 0) {
                dispatch(fetchAllInfosSuccess(res.infos.reverse()));
            } else {
                toast.error("fetch all info error!");
                dispatch(fetchAllInfosFailed());
                console.log('fetchAllInfosFailed', res)
            }
        } catch (e) {
            toast.error("fetch all info error!!");

            dispatch(fetchAllInfosFailed());
            console.log('fetchAllInfosFailed', e)
        }
    } 
}

export const fetchAllInfosSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_INFOS_SUCCESS,
    infos: data
})

export const fetchAllInfosFailed = () => ({
    type: actionTypes.FETCH_ALL_INFOS_FAILED,
})

export const deleteAInfo = (infoId) => {
    return async (dispatch, getstate) => {
        try {
            let res = await deleteInfoService(infoId);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("delete the info success!");
                dispatch(deleteInfoSuccess());
                dispatch(fetchAllInfosStart());
            } else {
                toast.error("delete the info error!");
                dispatch(deleteInfoFailed());
            }
        } catch (e) {
            toast.error("delete the info error!");
            dispatch(deleteInfoFailed());
            console.log('saveInfoFailed', e)
        }
    }
}

export const deleteInfoSuccess = () => ({
    type: actionTypes.DELETE_INFO_SUCCESS
})

export const deleteInfoFailed = () => ({
    type: actionTypes.DELETE_INFO_FAILED
})

export const editAInfo = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await editInfoService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("Update the info success!");
                dispatch(editInfoSuccess());
                dispatch(fetchAllInfosStart());
            } else {
                toast.error("Update the info error!");
                dispatch(editInfoFailed());
                console.log('editInfoFailed', res)

            }
        } catch (e) {
            toast.error("Update the info error!!");
            dispatch(editInfoFailed());
            console.log('editInfoFailed', e)
        }
    }
}

export const editInfoSuccess = () => ({
    type: actionTypes.EDIT_INFO_SUCCESS
})

export const editInfoFailed = () => ({
    type: actionTypes.EDIT_INFO_FAILED
})







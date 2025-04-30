import actionTypes from './actionTypes';
import{
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService,getAllLocations, createNewLocationService,
    deleteLocationService, editLocationService, getAllChargers, createNewChargerService,
    deleteChargerService, editChargerService, getAllTypes, createNewTypeService,
    deleteTypeService, editTypeService, getAllReservations, createNewReservationService,
    deleteReservationService, editReservationService, getAllHistorys, createNewHistoryService,
    deleteHistoryService, editHistoryService, getAllInfos, createNewInfoService,
    deleteInfoService, editInfoService, getAllFeedbacks, createNewFeedbackService,
    deleteFeedbackService, editFeedbackService, getAllDevices, createNewDeviceService,
    deleteDeviceService, editDeviceService, getAllMaintenances, createNewMaintenanceService,
    deleteMaintenanceService, editMaintenanceService, getAllNotifications, createNewNotificationService,
    deleteNotificationService, editNotificationService, getAllOtps, createNewOtpService,
    deleteOtpService, editOtpService,


}
 from '../../services/userService';
//import index from '../../services';
import { toast } from 'react-toastify';

//user
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

//location
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

//charger
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

//type
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

//reservation
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
//history
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
//info
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

//feedback
export const createNewFeedback = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await createNewFeedbackService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("create a new history success!");
                dispatch(saveFeedbackSuccess());
                dispatch(fetchAllFeedbacksStart());
            } else {
                toast.error("create a new history faild!!");
                dispatch(saveFeedbackFailed());
                console.log('createFeedbackFailed', res)

            }
        } catch (e) {
            dispatch(saveFeedbackFailed());
            console.log('saveFeedbackFailed', e)
        }
    }
}

export const saveFeedbackSuccess = () => ({
    type: actionTypes.CREATE_FEEDBACK_SUCCESS
})

export const saveFeedbackFailed = () => ({
    type: actionTypes.CREATE_FEEDBACK_FAILED
})

export const fetchAllFeedbacksStart = () => {
    return async (dispatch, getstate) => {
        try {
            let res = await getAllFeedbacks("All");
            if (res && res.errCode === 0) {
                dispatch(fetchAllFeedbacksSuccess(res.feedbacks.reverse()));
            } else {
                toast.error("fetch all feedback error!");
                dispatch(fetchAllFeedbacksFailed());
                console.log('fetchAllFeedbacksFailed', res)
            }
        } catch (e) {
            toast.error("fetch all feedback error!!");

            dispatch(fetchAllFeedbacksFailed());
            console.log('fetchAllFeedbacksFailed', e)
        }
    } 
}

export const fetchAllFeedbacksSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_FEEDBACKS_SUCCESS,
    feedbacks: data
})

export const fetchAllFeedbacksFailed = () => ({
    type: actionTypes.FETCH_ALL_FEEDBACKS_FAILED,
})

export const deleteAFeedback = (feedbackId) => {
    return async (dispatch, getstate) => {
        try {
            let res = await deleteFeedbackService(feedbackId);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("delete the feedback success!");
                dispatch(deleteFeedbackSuccess());
                dispatch(fetchAllFeedbacksStart());
            } else {
                toast.error("delete the feedback error!");
                dispatch(deleteFeedbackFailed());
            }
        } catch (e) {
            toast.error("delete the feedback error!");
            dispatch(deleteFeedbackFailed());
            console.log('saveFeedbackFailed', e)
        }
    }
}

export const deleteFeedbackSuccess = () => ({
    type: actionTypes.DELETE_FEEDBACK_SUCCESS
})

export const deleteFeedbackFailed = () => ({
    type: actionTypes.DELETE_FEEDBACK_FAILED
})

export const editAFeedback = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await editFeedbackService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("Update the feedback success!");
                dispatch(editFeedbackSuccess());
                dispatch(fetchAllFeedbacksStart());
            } else {
                toast.error("Update the feedback error!");
                dispatch(editFeedbackFailed());
                console.log('editFeedbackFailed', res)

            }
        } catch (e) {
            toast.error("Update the feedback error!!");
            dispatch(editFeedbackFailed());
            console.log('editFeedbackFailed', e)
        }
    }
}

export const editFeedbackSuccess = () => ({
    type: actionTypes.EDIT_FEEDBACK_SUCCESS
})

export const editFeedbackFailed = () => ({
    type: actionTypes.EDIT_FEEDBACK_FAILED
})

//device
export const createNewDevice = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await createNewDeviceService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("create a new device success!");
                dispatch(saveDeviceSuccess());
                dispatch(fetchAllDevicesStart());
            } else {
                toast.error("create a new device faild!!");
                dispatch(saveDeviceFailed());
                console.log('createDeviceFailed', res)

            }
        } catch (e) {
            dispatch(saveDeviceFailed());
            console.log('saveDeviceFailed', e)
        }
    }
}

export const saveDeviceSuccess = () => ({
    type: actionTypes.CREATE_DEVICE_SUCCESS
})

export const saveDeviceFailed = () => ({
    type: actionTypes.CREATE_DEVICE_FAILED
})

export const fetchAllDevicesStart = () => {
    return async (dispatch, getstate) => {
        try {
            let res = await getAllDevices("All");
            if (res && res.errCode === 0) {
                dispatch(fetchAllDevicesSuccess(res.devices.reverse()));
            } else {
                toast.error("fetch all device error!");
                dispatch(fetchAllDevicesFailed());
                console.log('fetchAllDevicesFailed', res)
            }
        } catch (e) {
            toast.error("fetch all device error!!");

            dispatch(fetchAllDevicesFailed());
            console.log('fetchAllDevicesFailed', e)
        }
    } 
}

export const fetchAllDevicesSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DEVICES_SUCCESS,
    devices: data
})

export const fetchAllDevicesFailed = () => ({
    type: actionTypes.FETCH_ALL_DEVICES_FAILED,
})

export const deleteADevice = (deviceId) => {
    return async (dispatch, getstate) => {
        try {
            let res = await deleteDeviceService(deviceId);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("delete the device success!");
                dispatch(deleteDeviceSuccess());
                dispatch(fetchAllDevicesStart());
            } else {
                toast.error("delete the device error!");
                dispatch(deleteDeviceFailed());
            }
        } catch (e) {
            toast.error("delete the device error!");
            dispatch(deleteDeviceFailed());
            console.log('saveDeviceFailed', e)
        }
    }
}

export const deleteDeviceSuccess = () => ({
    type: actionTypes.DELETE_DEVICE_SUCCESS
})

export const deleteDeviceFailed = () => ({
    type: actionTypes.DELETE_DEVICE_FAILED
})

export const editADevice = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await editDeviceService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("Update the device success!");
                dispatch(editDeviceSuccess());
                dispatch(fetchAllDevicesStart());
            } else {
                toast.error("Update the device error!");
                dispatch(editDeviceFailed());
                console.log('editDeviceFailed', res)

            }
        } catch (e) {
            toast.error("Update the device error!!");
            dispatch(editDeviceFailed());
            console.log('editDeviceFailed', e)
        }
    }
}

export const editDeviceSuccess = () => ({
    type: actionTypes.EDIT_DEVICE_SUCCESS
})

export const editDeviceFailed = () => ({
    type: actionTypes.EDIT_DEVICE_FAILED
})
//maintenance

export const createNewMaintenance = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await createNewMaintenanceService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("create a new maintenance success!");
                dispatch(saveMaintenanceSuccess());
                dispatch(fetchAllMaintenancesStart());
            } else {
                toast.error("create a new maintenance faild!!");
                dispatch(saveMaintenanceFailed());
                console.log('createMaintenanceFailed', res)

            }
        } catch (e) {
            dispatch(saveMaintenanceFailed());
            console.log('saveMaintenanceFailed', e)
        }
    }
}

export const saveMaintenanceSuccess = () => ({
    type: actionTypes.CREATE_MAINTENANCE_SUCCESS
})

export const saveMaintenanceFailed = () => ({
    type: actionTypes.CREATE_MAINTENANCE_FAILED
})

export const fetchAllMaintenancesStart = () => {
    return async (dispatch, getstate) => {
        try {
            let res = await getAllMaintenances("All");
            if (res && res.errCode === 0) {
                dispatch(fetchAllMaintenancesSuccess(res.maintenances.reverse()));
            } else {
                toast.error("fetch all maintenance error!");
                dispatch(fetchAllMaintenancesFailed());
                console.log('fetchAllMaintenancesFailed', res)
            }
        } catch (e) {
            toast.error("fetch all maintenance error!!");

            dispatch(fetchAllMaintenancesFailed());
            console.log('fetchAllMaintenancesFailed', e)
        }
    } 
}

export const fetchAllMaintenancesSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_MAINTENANCES_SUCCESS,
    maintenances: data
})

export const fetchAllMaintenancesFailed = () => ({
    type: actionTypes.FETCH_ALL_MAINTENANCES_FAILED,
})

export const deleteAMaintenance = (maintenanceId) => {
    return async (dispatch, getstate) => {
        try {
            let res = await deleteMaintenanceService(maintenanceId);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("delete the maintenance success!");
                dispatch(deleteMaintenanceSuccess());
                dispatch(fetchAllMaintenancesStart());
            } else {
                toast.error("delete the maintenance error!");
                dispatch(deleteMaintenanceFailed());
            }
        } catch (e) {
            toast.error("delete the maintenance error!");
            dispatch(deleteMaintenanceFailed());
            console.log('saveMaintenanceFailed', e)
        }
    }
}

export const deleteMaintenanceSuccess = () => ({
    type: actionTypes.DELETE_MAINTENANCE_SUCCESS
})

export const deleteMaintenanceFailed = () => ({
    type: actionTypes.DELETE_MAINTENANCE_FAILED
})

export const editAMaintenance = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await editMaintenanceService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("Update the maintenance success!");
                dispatch(editMaintenanceSuccess());
                dispatch(fetchAllMaintenancesStart());
            } else {
                toast.error("Update the maintenance error!");
                dispatch(editMaintenanceFailed());
                console.log('editMaintenanceFailed', res)

            }
        } catch (e) {
            toast.error("Update the maintenance error!!");
            dispatch(editMaintenanceFailed());
            console.log('editMaintenanceFailed', e)
        }
    }
}

export const editMaintenanceSuccess = () => ({
    type: actionTypes.EDIT_MAINTENANCE_SUCCESS
})

export const editMaintenanceFailed = () => ({
    type: actionTypes.EDIT_MAINTENANCE_FAILED
})
//notification
export const createNewNotification = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await createNewNotificationService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("create a new notification success!");
                dispatch(saveNotificationSuccess());
                dispatch(fetchAllNotificationsStart());
            } else {
                toast.error("create a new notification faild!!");
                dispatch(saveNotificationFailed());
                console.log('createNotificationFailed', res)

            }
        } catch (e) {
            dispatch(saveNotificationFailed());
            console.log('saveNotificationFailed', e)
        }
    }
}

export const saveNotificationSuccess = () => ({
    type: actionTypes.CREATE_NOTIFICATION_SUCCESS
})

export const saveNotificationFailed = () => ({
    type: actionTypes.CREATE_NOTIFICATION_FAILED
})

export const fetchAllNotificationsStart = () => {
    return async (dispatch, getstate) => {
        try {
            let res = await getAllNotifications("All");
            if (res && res.errCode === 0) {
                dispatch(fetchAllNotificationsSuccess(res.notifications.reverse()));
            } else {
                toast.error("fetch all notification error!");
                dispatch(fetchAllNotificationsFailed());
                console.log('fetchAllNotificationsFailed', res)
            }
        } catch (e) {
            toast.error("fetch all notification error!!");

            dispatch(fetchAllNotificationsFailed());
            console.log('fetchAllNotificationsFailed', e)
        }
    } 
}

export const fetchAllNotificationsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_NOTIFICATIONS_SUCCESS,
    notifications: data
})

export const fetchAllNotificationsFailed = () => ({
    type: actionTypes.FETCH_ALL_NOTIFICATIONS_FAILED,
})

export const deleteANotification = (notificationId) => {
    return async (dispatch, getstate) => {
        try {
            let res = await deleteNotificationService(notificationId);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("delete the notification success!");
                dispatch(deleteNotificationSuccess());
                dispatch(fetchAllNotificationsStart());
            } else {
                toast.error("delete the notification error!");
                dispatch(deleteNotificationFailed());
            }
        } catch (e) {
            toast.error("delete the notification error!");
            dispatch(deleteNotificationFailed());
            console.log('saveNotificationFailed', e)
        }
    }
}

export const deleteNotificationSuccess = () => ({
    type: actionTypes.DELETE_NOTIFICATION_SUCCESS
})

export const deleteNotificationFailed = () => ({
    type: actionTypes.DELETE_NOTIFICATION_FAILED
})

export const editANotification = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await editNotificationService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("Update the notification success!");
                dispatch(editNotificationSuccess());
                dispatch(fetchAllNotificationsStart());
            } else {
                toast.error("Update the notification error!");
                dispatch(editNotificationFailed());
                console.log('editNotificationFailed', res)

            }
        } catch (e) {
            toast.error("Update the notification error!!");
            dispatch(editNotificationFailed());
            console.log('editNotificationFailed', e)
        }
    }
}

export const editNotificationSuccess = () => ({
    type: actionTypes.EDIT_NOTIFICATION_SUCCESS
})

export const editNotificationFailed = () => ({
    type: actionTypes.EDIT_NOTIFICATION_FAILED
})
//otp

export const createNewOtp = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await createNewOtpService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("create a new otp success!");
                dispatch(saveOtpSuccess());
                dispatch(fetchAllOtpsStart());
            } else {
                toast.error("create a new otp faild!!");
                dispatch(saveOtpFailed());
                console.log('createOtpFailed', res)

            }
        } catch (e) {
            dispatch(saveOtpFailed());
            console.log('saveOtpFailed', e)
        }
    }
}

export const saveOtpSuccess = () => ({
    type: actionTypes.CREATE_OTP_SUCCESS
})

export const saveOtpFailed = () => ({
    type: actionTypes.CREATE_OTP_FAILED
})

export const fetchAllOtpsStart = () => {
    return async (dispatch, getstate) => {
        try {
            let res = await getAllOtps("All");
            if (res && res.errCode === 0) {
                dispatch(fetchAllOtpsSuccess(res.otps.reverse()));
            } else {
                toast.error("fetch all otp error!");
                dispatch(fetchAllOtpsFailed());
                console.log('fetchAllOtpsFailed', res)
            }
        } catch (e) {
            toast.error("fetch all otp error!!");

            dispatch(fetchAllOtpsFailed());
            console.log('fetchAllOtpsFailed', e)
        }
    } 
}

export const fetchAllOtpsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_OTPS_SUCCESS,
    otps: data
})

export const fetchAllOtpsFailed = () => ({
    type: actionTypes.FETCH_ALL_OTPS_FAILED,
})

export const deleteAOtp = (otpId) => {
    return async (dispatch, getstate) => {
        try {
            let res = await deleteOtpService(otpId);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("delete the otp success!");
                dispatch(deleteOtpSuccess());
                dispatch(fetchAllOtpsStart());
            } else {
                toast.error("delete the otp error!");
                dispatch(deleteOtpFailed());
            }
        } catch (e) {
            toast.error("delete the otp error!");
            dispatch(deleteOtpFailed());
            console.log('saveOtpFailed', e)
        }
    }
}

export const deleteOtpSuccess = () => ({
    type: actionTypes.DELETE_OTP_SUCCESS
})

export const deleteOtpFailed = () => ({
    type: actionTypes.DELETE_OTP_FAILED
})

export const editAOtp = (data) => {
    return async (dispatch, getstate) => {
        try {
            let res = await editOtpService(data);
            //console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("Update the otp success!");
                dispatch(editOtpSuccess());
                dispatch(fetchAllOtpsStart());
            } else {
                toast.error("Update the otp error!");
                dispatch(editOtpFailed());
                console.log('editOtpFailed', res)

            }
        } catch (e) {
            toast.error("Update the otp error!!");
            dispatch(editOtpFailed());
            console.log('editOtpFailed', e)
        }
    }
}

export const editOtpSuccess = () => ({
    type: actionTypes.EDIT_OTP_SUCCESS
})

export const editOtpFailed = () => ({
    type: actionTypes.EDIT_OTP_FAILED
})












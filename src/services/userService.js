import axios from '../axios'

//user
const handleLogin = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    //tamplate string
    return axios.get(`/api/get-all-user?id=${inputId}`)
}

const getRole = (inputRole) => {
    //tamplate string
    return axios.get(`/api/get-role?roleId=${inputRole}`)
}

const createNewUserService = (data) => {
    //console.log('check data from service: ', data)
    return axios.post('/api/create-new-user1', data)
}

const deleteUserService = (userId) => {
    //return axios.post('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

//location
const getAllLocations = (inputId) => {
    //tamplate string
    return axios.get(`/api/get-all-location?id=${inputId}`)
}

const getAllLocationByUserId = (inputId) => {
    //tamplate string
    return axios.get(`/api/get-all-location-by-userId?user_id=${inputId}`)
}

const createNewLocationService = (data) => {
    //console.log('check data from service: ', data)
    return axios.post('/api/create-location', data)
}

const deleteLocationService = (locationId) => {
    //return axios.post('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-location', {
        data: {
            id: locationId
        }
    });
}

const editLocationService = (inputData) => {
    return axios.put('/api/edit-location', inputData);
}

//charger
const getAllChargers = (inputId) => {
    //tamplate string
    return axios.get(`/api/get-all-charger?id=${inputId}`)
}

const getAllChargerByUserId = (inputId) => {
    //tamplate string
    return axios.get(`/api/get-all-charger-by-userid?user_id=${inputId}`)
}

const createNewChargerService = (data) => {
    //console.log('check data from service: ', data)
    return axios.post('/api/create-charger', data)
}

const deleteChargerService = (chargerId) => {
    //return axios.post('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-charger', {
        data: {
            id: chargerId
        }
    });
}

const editChargerService = (inputData) => {
    return axios.put('/api/edit-charger', inputData);
}

//type
const getAllTypes = (inputId) => {
    //tamplate string
    return axios.get(`/api/get-all-type?id=${inputId}`)
}

const getAllTypeByChargerId = (inputId) => {
    //tamplate string
    return axios.get(`/api/get-all-type-by-chargerId?charger_id=${inputId}`)
}

const getAllTypeByUserId = (inputId) => {
    //tamplate string
    return axios.get(`/api/get-all-type-by-userid?user_id=${inputId}`)
}

const createNewTypeService = (data) => {
    //console.log('check data from service: ', data)
    return axios.post('/api/create-type', data)
}

const deleteTypeService = (typeId) => {
    //return axios.post('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-type', {
        data: {
            id: typeId
        }
    });
}

const editTypeService = (inputData) => {
    return axios.put('/api/edit-type', inputData);
}

//reservation
const getAllReservations = (inputId) => {
    return axios.get(`/api/get-all-reservation?id=${inputId}`)
}

const getAllReservationsByUserId = (inputId) => {
    return axios.get(`/api/get-all-reservation-by-ownerid?user_id=${inputId}`)
}

const createNewReservationService = (data) => {
    return axios.post('/api/create-reservation', data)
}

const deleteReservationService = (reservationId) => {
    return axios.delete('/api/delete-reservation', {
        data: {
            id: reservationId
        }
    });
}

const editReservationService = (inputData) => {
    return axios.put('/api/edit-reservation', inputData);
}

//history
const getAllHistorys = (inputId) => {
    return axios.get(`/api/get-all-history?id=${inputId}`)
}

const getAllHistorysbyUserId = (inputId) => {
    return axios.get(`/api/get-all-history-by-ownerid?user_id=${inputId}`)
}

const createNewHistoryService = (data) => {
    return axios.post('/api/create-history', data)
}

const deleteHistoryService = (historyId) => {
    return axios.delete('/api/delete-history', {
        data: {
            id: historyId
        }
    });
}

const editHistoryService = (inputData) => {
    return axios.put('/api/edit-history', inputData);
}
//info
const getAllInfos = (inputId) => {
    return axios.get(`/api/get-all-info?id=${inputId}`)
}    


const getAllInfosByUserId = (inputId) => {
    return axios.get(`/api/get-info-by-userid?user_id=${inputId}`)
}


const createNewInfoService = (data) => {
    return axios.post('/api/create-info', data)
}

const deleteInfoService = (infoId) => {
    return axios.delete('/api/delete-info', {
        data: {
            id: infoId
        }
    });
}

const editInfoService = (inputData) => {
    return axios.put('/api/edit-info', inputData);
}
//feedback
const getAllFeedbacks = (inputId) => {
    return axios.get(`/api/get-all-feedback?id=${inputId}`)
}

const getAllFeedbackByOwnerId = (inputId) => {
    return axios.get(`/api/get-all-feedback-by-ownerid?user_id=${inputId}`)
}

const createNewFeedbackService = (data) => {
    return axios.post('/api/create-feedback', data)
}

const deleteFeedbackService = (feedbackId) => {
    return axios.delete('/api/delete-feedback', {
        data: {
            id: feedbackId
        }
    });
}

const editFeedbackService = (inputData) => {
    return axios.put('/api/edit-feedback', inputData);
}
//device
const getAllDevices = (inputId) => {
    return axios.get(`/api/get-all-device?id=${inputId}`)
}

const getAllDevicesByUserId = (inputId) => {
    return axios.get(`/api/get-all-device-by-userid?user_id=${inputId}`)
}

const createNewDeviceService = (data) => {
    return axios.post('/api/create-device', data)
}

const deleteDeviceService = (deviceId) => {
    return axios.delete('/api/delete-device', {
        data: {
            id: deviceId
        }
    });
}

const editDeviceService = (inputData) => {
    return axios.put('/api/edit-device', inputData);
}
//maintenance
const getAllMaintenances = (inputId) => {
    return axios.get(`/api/get-all-maintenance?id=${inputId}`)
}

const getAllMaintenancesByUserId = (inputId) => {
    return axios.get(`/api/get-all-maintenance-by-userid?user_id=${inputId}`)
}

const createNewMaintenanceService = (data) => {
    return axios.post('/api/create-maintenance', data)
}

const deleteMaintenanceService = (maintenanceId) => {
    return axios.delete('/api/delete-maintenance', {
        data: {
            id: maintenanceId
        }
    });
}

const editMaintenanceService = (inputData) => {
    return axios.put('/api/edit-maintenance', inputData);
}
//notification
const getAllNotifications = (inputId) => {
    return axios.get(`/api/get-all-notification?id=${inputId}`)
}

const createNewNotificationService = (data) => {
    return axios.post('/api/create-notification', data)
}

const deleteNotificationService = (notificationId) => {
    return axios.delete('/api/delete-notification', {
        data: {
            id: notificationId
        }
    });
}

const editNotificationService = (inputData) => {
    return axios.put('/api/edit-notification', inputData);
}
//otp
const getAllOtps = (inputId) => {
    return axios.get(`/api/get-all-otp?id=${inputId}`)
}

const createNewOtpService = (data) => {
    return axios.post('/api/create-otp', data)
}

const deleteOtpService = (otpId) => {
    return axios.delete('/api/delete-otp', {
        data: {
            id: otpId
        }
    });
}

const editOtpService = (inputData) => {
    return axios.put('/api/edit-otp', inputData);
}


export {
    handleLogin, getAllUsers, getRole,
    createNewUserService, deleteUserService,
    editUserService, getAllCodeService,
    getAllLocations, createNewLocationService, getAllLocationByUserId, 
    deleteLocationService, editLocationService,
    getAllChargers, createNewChargerService, getAllChargerByUserId, 
    deleteChargerService, editChargerService,
    getAllTypes, createNewTypeService, getAllTypeByChargerId,
    deleteTypeService, editTypeService, getAllTypeByUserId,
    getAllReservations, createNewReservationService, getAllReservationsByUserId,
    deleteReservationService, editReservationService,
    getAllHistorys, createNewHistoryService, getAllHistorysbyUserId,
    deleteHistoryService, editHistoryService,
    getAllInfos, createNewInfoService, getAllInfosByUserId,
    deleteInfoService, editInfoService,
    getAllFeedbacks, createNewFeedbackService, getAllFeedbackByOwnerId,
    deleteFeedbackService, editFeedbackService,
    getAllDevices, createNewDeviceService, getAllDevicesByUserId,
    deleteDeviceService, editDeviceService,
    getAllMaintenances, createNewMaintenanceService, getAllMaintenancesByUserId,
    deleteMaintenanceService, editMaintenanceService,
    getAllNotifications, createNewNotificationService,
    deleteNotificationService, editNotificationService,
    getAllOtps, createNewOtpService,
    deleteOtpService, editOtpService,

}